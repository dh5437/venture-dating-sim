const express = require('express');
const router = express.Router();

const { MAP_TYPE } = require('../constant/constant');
const { setAuth } = require('../utils');
const { Map, Coordinate, Monster, Item, Rest } = require('../models');
const { getRandomQuery } = require('../utils/random');

router.get('/me', setAuth, async (req, res) => {
  const user = req.user;
  const { level, str, def, hp, exp, items, maxHp } = user;
  const userInfo = { level, str, def, hp, maxHp, exp, items };

  const map = await Map.findById(user.map);
  const coordinate = await Coordinate.findById(map.coordinate);
  const event = map.event;

  const { BATTLE, ITEM, REST } = MAP_TYPE;
  switch (event) {
    case BATTLE:
      const monster = await Monster.find().then(getRandomQuery);
      return res.send({
        userInfo,
        coordinate,
        event,
        id: monster.id,
        message: monster.description,
      });

    case ITEM:
      const item = await Item.find().then(getRandomQuery);
      return res.send({
        userInfo,
        coordinate,
        event,
        id: item.id,
        message: item.description,
        name: item.name,
      });

    case REST:
    default:
      const rest = await Rest.find().then(getRandomQuery);
      return res.send({ userInfo, coordinate, event, id: rest.id, message: rest.description });
  }
});

module.exports = router;
