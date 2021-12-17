const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  res.send('Welcome!');
});

module.exports = router;
