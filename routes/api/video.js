const express = require('express');
const multer  = require('multer');
const AWS = require('aws-sdk');
const Config = require('../../config');
const fs = require('fs');
const db = require('../../database');

// Set multer config (storage & upload)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'tmp/');
  },
  filename: (req, file, cb) => {
    const fileExtension = file.mimetype.substring(file.mimetype.indexOf('/') + 1);
    cb(null, req.body.videoId + '.' + fileExtension);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    cb(null, file.mimetype.includes('video/'));
  }
});

const router = express.Router();

router.put('/upload', upload.single('video'), (req, res) => {
  const uploadedFile = req.file;
  if(uploadedFile) {
    const uploadedFileStream = fs.createReadStream('./tmp/' + uploadedFile.filename);

    // get id for new video from file name, create entry in UPLOAD_IN_PROGRESS table
    const videoId = uploadedFile.filename.substring(0, uploadedFile.filename.length - 4);
    db('UPLOAD_IN_PROGRESS').insert({VIDEO_ID: videoId, PERCENTAGE_UPLOADED: 0})
      .then(() => null)
      .catch(err => {
        console.log('An error occurred while trying to create a new entry in UPLOAD_IN_PROGRESS for video id ' + videoId);
        console.log(err);
      });

    const s3bucket = new AWS.S3({
      accessKeyId: Config.aws.ACCESS_KEY_ID,
      secretAccessKey: Config.aws.SECRET_ACCESS_KEY,
      Bucket: Config.aws.BUCKET_NAME
    });

    const params = {Bucket: Config.aws.BUCKET_NAME, Key: uploadedFile.filename, Body: uploadedFileStream};
    const upload = new AWS.S3.ManagedUpload({params, service: s3bucket});
    upload.on('httpUploadProgress', ({ loaded, total }) => {
      const percentageUploaded = Math.round((loaded / total) * 100);
      db('UPLOAD_IN_PROGRESS').where('VIDEO_ID', '=', videoId)
        .update({PERCENTAGE_UPLOADED: percentageUploaded})
          .then(() => null)
          .catch(err => {
            console.log('Error updating progress percentage to value: ' + percentageUploaded + ' for video id ' + videoId);
            console.log(err);
          });
    });

    upload.send((err, data) => {
      if(err) {
        console.log('Error while uploading video with id: ' + videoId + ' to S3 bucket');
        console.log(err);
        res.status(404);
      } else {
        // remove video from UPLOAD_IN_PROGRESS table after 5 seconds
        setTimeout(() => {
          db('UPLOAD_IN_PROGRESS').where('VIDEO_ID', '=', videoId).del()
            .then(() => null)
            .catch(err => {
              console.log('Error deleting video from UPLOAD_IN_PROGRESS with video id: ' + videoId);
              console.log(err);
            })
        }, 5000);

        res.json({videoId});
      }
    });
  }
});

router.get('/upload-progress', (req, res) => {
  const { videoId } = req.query;

  db('UPLOAD_IN_PROGRESS').where('VIDEO_ID', videoId).select('PERCENTAGE_UPLOADED')
    .then(results => {
      const { PERCENTAGE_UPLOADED } = results[0];
      res.json({percentageUploaded: PERCENTAGE_UPLOADED});
    }).catch(err => {
      console.log('Error querying for percentage uploaded for video id ' + videoId);
      console.log(err);
      res.status(404).send();
    });
});

module.exports = router;