const express = require('express');
const router = express.Router();

const { setAuth } = require('../utils');

router.get('/', setAuth, async (req, res) => {
  const user = req.user;
  const userInfo = {
    level: user.level,
    str: user.str,
    def: user.def,
    hp: user.hp,
    exp: user.exp,
  };
  return res.status(200).send({ userInfo });
});
