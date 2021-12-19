const express = require('express');
const router = express.Router();

const { setAuth } = require('../utils');
const { Item } = require('../models');

router.get('/:id', setAuth, async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const item = await Item.findOne({ user, id });
  const userItems = user.items;
  const isValidId = await Item.find({ id });
  const isInUserItems = userItems.find((testItem) => item.id === testItem.id);

  if (!isValidId) {
    return res.status(404).send({ error: 'corresponding item is not found' });
  } else if (isInUserItems) {
    item.qunatity += 1;
  } else if (!isInUserItems) {
    userItems.push(item);
    item.qunatity += 1;
  }

  user.hp += item.hp;
  user.exp += item.exp;
  user.str += item.str;
  // user.def += item.def

  await item.save();
  await user.save();

  const log = `아이템 ${item.name}을 획득했다!`;

  res.status(200).send({ user, item, log });
});

module.exports = router;
