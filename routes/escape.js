const express = require('express');
const router = express.Router();

const { setAuth } = require('../utils');

router.get('/', setAuth, (req, res) => {
  const user = req.user;
  const userInfo = {
    level: user.level,
    str: user.str,
    def: user.def,
    hp: user.hp,
    maxHp: user.maxHp,
    exp: user.exp,
    items: user.items,
  };

  const message = '성공적으로 도망쳤다!';

  res.send({ userInfo, message });
});

module.exports = router;
