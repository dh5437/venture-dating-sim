const express = require('express');
const router = express.Router();

const { setAuth } = require('../utils');
const { Item } = require('../models');

router.get('/:id', setAuth, async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const item = await Item.findOne({ id });

  // 해당 아이디를 가진 아이템이 Item 모델 자체에 있는지 확인
  const existItem = await Item.find({ id });
  // 해당 아이디를 가진 아이템이 user.items에 있는지 확인
  const targetItem = await user.items.findOne({ item: item.id });

  if (!existItem) {
    return res.status(404).send({ error: 'corresponding item is not found' });
  } else if (targetItem) {
    user.items.item.qunatity += 1;
  } else if (!targetItem) {
    user.items.push(item);
  }

  user.hp += item.hp;
  user.exp += item.exp;
  user.str += item.str;
  // user.def += item.def

  await item.save();
  await user.save();

  // log: 아이템 {item.name}을 획득했다! {0 < 일때만 보이게}가 { } 상승했다! -> 어떻게?
  const log = `아이템 ${item.name}을 획득했다!`;

  res.send({ user, item, log });
});

module.exports = router;
