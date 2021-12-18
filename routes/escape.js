const express = require('express');
const router = express.Router();

const { setAuth } = require('../utils');

router.get('/', setAuth, async (req, res) => {
  const user = req.user;
  const log = '도망쳤습니다!';

  res.send({ log });
});

module.exports = router;
