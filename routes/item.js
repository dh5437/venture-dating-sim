const express = require('express');
const router = express.Router();

const { setAuth } = require('../utils');
const { Item } = require('../models');

router.get('/:itemId', setAuth, async (req, res) => {
  const user = req.user;
  const { itemId } = req.params;

  // 아이템 받아오기
  // log: 아이템 { }을 획득했다! { }가 { } 상승했다!
  // 아이템에 따른 str과 def, hp 변화 반영
  // user의 items에 업데이트 -> client에 쏴주기
  // client에 뿌려줄 것들: user 모델(items , 변경된 유저 정보), 획득한 아이템 이름, 메시지(로그)

  await item.save();
  await user.save();
  res.send({ user, item, log });
});

module.exports = router;
