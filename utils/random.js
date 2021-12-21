const { MAP_TYPE } = require('../constant/constant');

const getRandomNumberWithMaximum = (maximum) => {
  return Math.floor(Math.random() * maximum);
};

const getRandomMapType = (index = 0) => {
  if (index < 1) {
    return MAP_TYPE.BATTLE;
  } else if (index < 2) {
    return MAP_TYPE.ITEM;
  }

  return MAP_TYPE.REST;
};

module.exports = {
  getRandomNumberWithMaximum,
  getRandomMapType,
};
