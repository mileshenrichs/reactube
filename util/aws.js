const AWS = require('aws-sdk');
const Config = require('../config');

const S3Bucket = () => new AWS.S3({
  accessKeyId: Config.aws.ACCESS_KEY_ID,
  secretAccessKey: Config.aws.SECRET_ACCESS_KEY,
  Bucket: Config.aws.BUCKET_NAME
});

module.exports.S3Bucket = S3Bucket;