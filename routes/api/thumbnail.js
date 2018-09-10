const express = require('express');
const Config = require('../../config');
const { S3Bucket } = require('../../util/aws');

const router = express.Router();

router.get('/', (req, res) => {
  const { fileName } = req.query;
  
  const s3bucket = S3Bucket();
  const params = {Bucket: Config.aws.BUCKET_NAME, Key: fileName};
  s3bucket.getObject(params, (err, data) => {
      if (err) {
        console.log('Error getting object from S3 bucket with file name: ' + fileName);
        console.log(err);
        res.status(404).send();
      }

      const thumbBase64 = data.Body.toString('base64'); // Use the encoding necessary
      res.json({thumbBase64});
  });
});

module.exports = router;