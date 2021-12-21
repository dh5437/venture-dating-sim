const express = require('express');
const router = express.Router();

const { setAuth } = require('../utils');

router.get('/', setAuth, (req, res) => {
  const user = req.user;
  const message = '놀랍게도 아무 일도 일어나지 않았다...';
  const userInfo = {
    level: user.level,
    str: user.str,
    def: user.def,
    hp: user.hp,
    exp: user.exp,
  };

  res.send({ userInfo, message });
});

module.exports = router;
