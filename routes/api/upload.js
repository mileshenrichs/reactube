const express = require('express');
const { generateVideoId } = require('../../util/identifiers');

const router = express.Router();

router.get('/generate-id', (req, res) => {
  res.json({
    generatedId: generateVideoId()
  });
});

module.exports = router;