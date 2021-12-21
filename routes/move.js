const express = require('express');
const router = express.Router();

const { Map } = require('../models');
const { checkIsValidCoordinate } = require('../utils/checkHelper');
const { getRandomNumberWithMaximum, getRandomMapType } = require('../utils/random');

router.post('/', async (req, res) => {
  const { rowIndex, columnIndex } = req.params;

  if (checkIsValidCoordinate(+rowIndex, +columnIndex)) {
    return res.status(400).send({ message: '잘못된 접근입니다.' });
  }

  const randomNumber = getRandomNumberWithMaximum(3);
  const randomMapType = getRandomMapType(randomNumber);

  const matchedMap = await Map.find({ event: randomMapType }, (maps) => {
    const randomMapIndex = getRandomNumberWithMaximum(maps.length);
    return maps[randomMapIndex];
  });

  return res.send({ matchedMap });
});

module.exports = router;
