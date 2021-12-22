const express = require('express');
const router = express.Router();

const { setAuth } = require('../utils');
const { Rest } = require('../models');

router.get('/:id', setAuth, async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const rest = await Rest.findOne({ id });
  const message = rest.description;
  const userInfo = {
    level: user.level,
    str: user.str,
    def: user.def,
    hp: user.hp,
    exp: user.exp,
    maxHp: user.maxHp,
  };

  res.send({ userInfo, message });
});

module.exports = router;
