const express = require('express');
const multer  = require('multer');

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

router.get('/', (req, res) => {
  res.send('hello');
});

router.put('/upload', upload.single('video'), (req, res) => {
  console.log(req.file);
  res.status(204).send('');
});

module.exports = router;