const express = require('express');
const videoRouter = require('./video');
const router = express.Router();

router.use('/video', videoRouter);

module.exports = router;