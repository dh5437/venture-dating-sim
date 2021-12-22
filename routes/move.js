const express = require('express');
const { MAP_TYPE } = require('../constant/constant');
const router = express.Router();

const { setAuth } = require('../utils');
const { Monster, Item, Rest } = require('../models');
const { checkIsValidCoordinate } = require('../utils/checkHelper');
const { getRandomNumberWithMaximum, getRandomMapType, getRandomQuery } = require('../utils/random');

router.post('/', setAuth, async (req, res) => {
  const { rowIndex, columnIndex } = req.query;
  if (!checkIsValidCoordinate(+rowIndex, +columnIndex)) {
    return res.status(400).send({ message: '잘못된 접근입니다.' });
  }

  const randomNumber = getRandomNumberWithMaximum(3);
  const randomMapType = getRandomMapType(randomNumber);

  const { BATTLE, ITEM, REST } = MAP_TYPE;

  switch (randomMapType) {
    case BATTLE:
      const monster = await Monster.find().then(getRandomQuery(monsters));

      return res.send({ event: randomMapType, id: monster.id, message: monster.description });

    case ITEM:
      const item = await Item.find().then(getRandomQuery(items));
      return res.send({
        event: randomMapType,
        id: item.id,
        message: item.description,
        name: item.name,
      });

    case REST:
    default:
      const rest = await Rest.find().then(getRandomQuery(rests));
      return res.send({ event: randomMapType, id: rest.id, message: rest.description });
  }
});

module.exports = router;
