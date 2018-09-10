const express = require('express');
const videoRouter = require('./video');
const uploadRouter = require('./upload'); 
const thumbnailRouter = require('./thumbnail');

const router = express.Router();

router.use('/video', videoRouter);
router.use('/upload', uploadRouter);
router.use('/thumbnail', thumbnailRouter);

module.exports = router;