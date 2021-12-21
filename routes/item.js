const express = require('express');
const router = express.Router();

const { setAuth } = require('../utils');
const { Item } = require('../models');

router.get('/:id', setAuth, async (req, res) => {
  const user = req.user;
  const { id } = req.params;

  // user.items와는 무관, user당 생성된 아이템들
  // await Item.find({ user })의 리턴값이 배열이 아니라면 userItems가 배열 형태가 되게 fix
  const userItems = await Item.find({ user });
  const targetItem = userItems.filter((item) => item.id === id)[0];
  const targetItemName = targetItem.name;

  if (!targetItem) {
    return res.status(404).send({ error: 'corresponding item is not found' });
  }

  targetItem.qunatity += 1;
  user.hp += targetItem.hp;
  user.exp += targetItem.exp;
  user.str += targetItem.str;
  user.def += targetItem.def;

  user.items = userItems.filter((item) => item.qunatity > 0);

  await targetItem.save();
  await user.save();

  const userInfo = {
    level: user.level,
    str: user.str,
    def: user.def,
    hp: user.hp,
    exp: user.exp,
    items: user.items,
  };

  const message = `${targetItem.name}을 획득했다!`;

  res.status(200).send({ userInfo, targetItemName, message });
});

module.exports = router;

// const user = req.user;
// const { id } = req.params;
// const item = await Item.find({ user, id });

// 여기서 signup시 모두 user.items에 넣어주던지
// const userItems = user.items;
// const isValidId = await Item.find({ id });
// const isInUserItems = userItems.some((testItem) => item.id === testItem.id);

// if (!isValidId) {
//   return res.status(404).send({ error: 'corresponding item is not found' });
// }

// if (!isInUserItems) {
//   userItems.push(item);
// }

// item.qunatity += 1;
// user.hp += item.hp;
// user.exp += item.exp;
// user.str += item.str;
// // user.def += item.def

// await item.save();
// await user.save();

// const log = `아이템 ${item.name}을 획득했다!`;

// res.status(200).send({ user, item, log });
