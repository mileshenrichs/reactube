const express = require('express');
const videoRouter = require('./video');
const uploadRouter = require('./upload'); 

const router = express.Router();

router.use('/video', videoRouter);
router.use('/upload', uploadRouter);

module.exports = router;