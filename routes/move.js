const express = require('express');
const { MAP_TYPE } = require('../constant/constant');
const router = express.Router();

const { Map, Monster, Item } = require('../models');
const { checkIsValidCoordinate } = require('../utils/checkHelper');
const { getRandomNumberWithMaximum, getRandomMapType } = require('../utils/random');

router.post('/', async (req, res) => {
  const { rowIndex, columnIndex } = req.query;
  if (!checkIsValidCoordinate(+rowIndex, +columnIndex)) {
    return res.status(400).send({ message: '잘못된 접근입니다.' });
  }

  const randomNumber = getRandomNumberWithMaximum(3);
  const randomMapType = getRandomMapType(randomNumber);

  const matchedMap = await Map.find({ event: randomMapType }).then((maps) => {
    const randomMapIndex = getRandomNumberWithMaximum(maps.length);
    return maps[randomMapIndex];
  });

  const { BATTLE, ITEM, REST } = MAP_TYPE;
  let matchedObj;
  switch (randomMapType) {
    case BATTLE:
      matchedObj = await Monster.find().then((monsters) => {
        const randomMonsterIndex = getRandomNumberWithMaximum(monsters.length);
        return monsters[randomMonsterIndex];
      });
      break;
    case ITEM:
      matchedObj = await Item.find().then((items) => {
        const randomItemIndex = getRandomNumberWithMaximum(items.length);
        return items[randomItemIndex];
      });
      break;
    case REST:
    default:
      matchedObj = await Rest.find().then((rests) => {
        const randomItemIndex = getRandomNumberWithMaximum(rests.length);
        return rests[randomItemIndex];
      });
      break;
  }

  return res.send({ matchedMap, matchedObj });
});

module.exports = router;
