const express = require('express');
const multer  = require('multer');
const AWS = require('aws-sdk');
const Config = require('../../config');
const fs = require('fs');
const path = require('path');
const { generateVideoId } = require('../../util/identifiers');

// Set multer config (storage & upload)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'tmp/');
  },
  filename: (req, file, cb) => {
    const fileExtension = file.mimetype.substring(file.mimetype.indexOf('/') + 1);
    cb(null, file.fieldname + '-' + Date.now() + '.' + fileExtension);
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

    // generate id for new video
    const videoId = generateVideoId();

    const s3bucket = new AWS.S3({
      accessKeyId: Config.aws.ACCESS_KEY_ID,
      secretAccessKey: Config.aws.SECRET_ACCESS_KEY,
      Bucket: Config.aws.BUCKET_NAME
    });

    console.log(uploadedFile);
    console.log('------------------------');

    const params = {Bucket: Config.aws.BUCKET_NAME, Key: uploadedFile.filename, Body: uploadedFileStream};
    const upload = new AWS.S3.ManagedUpload({params, service: s3bucket});
    upload.on('httpUploadProgress', progress => {
      console.log(progress);
    });

    upload.send(function(err, data) {
      if(err) {
        console.log('error in callback');
        console.log(err);
      } else {
        console.log('success');
        console.log(data);
      }

      res.status(204).send('');
    });
  }
});

module.exports = router;