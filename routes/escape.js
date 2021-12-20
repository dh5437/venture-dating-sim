const express = require('express');
const router = express.Router();

const { setAuth } = require('../utils');

router.get('/', setAuth, (req, res) => {
  const user = req.user;
  const log = '성공적으로 도망쳤습니다!';

  res.send({ user, log });
});

module.exports = router;
