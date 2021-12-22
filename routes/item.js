const express = require('express');
const router = express.Router();

const { setAuth } = require('../utils');
const { Item } = require('../models');

router.get('/:id', setAuth, async (req, res) => {
  const user = req.user;
  const id = +req.params.id;

  // user.items와는 무관, user당 생성된 아이템들
  // await Item.find({ user })의 리턴값이 배열이 아니라면 userItems가 배열 형태가 되게 fix
  const userItems = await Item.find({ user });
  const targetItem = userItems.filter((item) => item.id === id)[0];
  const targetItemName = targetItem.name;

  if (!targetItem) {
    return res.status(404).send({ error: 'corresponding item is not found' });
  }

  targetItem.quantity += 1;
  user.hp += targetItem.hp ? targetItem.hp : 0;
  user.str += targetItem.str ? targetItem.str : 0;
  user.def += targetItem.def ? targetItem.def : 0;

  user.items = userItems.filter((item) => item.quantity > 0);
  await targetItem.save();
  await user.save();

  const userInfo = {
    level: user.level,
    str: user.str,
    def: user.def,
    maxHp: user.maxHp,
    hp: user.hp,
    exp: user.exp,
    items: user.items,
  };

  const message = `${targetItem.name}을 획득했다!`;

  res.status(200).send({ userInfo, id: targetItem.id, name: targetItemName, message });
});

module.exports = router;
