const express = require('express');
const router = express.Router();

const { setAuth } = require('../utils');
const { Item } = require('../models');

router.get('/:itemId', setAuth, async (req, res) => {
  const user = req.user;
  // 아이템 받아오기
  const { itemId } = req.params;
  // log: 아이템 { }을 획득했다! { }가 { } 상승했다!

  await item.save();
  await user.save();
  res.send({ user, item, log });
});

module.exports = router;
