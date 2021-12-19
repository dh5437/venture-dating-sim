const express = require('express');
const router = express.Router();

const { setAuth } = require('../utils');

router.get('/', setAuth, (req, res) => {
  const user = req.user;
  const log = '아무 일도 일어나지 않았다.';

  res.send({ user, log });
});

module.exports = router;
