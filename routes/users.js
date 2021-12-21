const express = require('express');
const router = express.Router();

const { setAuth } = require('../utils');

router.get('/me', setAuth, async (req, res) => {
  const user = req.user;
  const { level, str, def, hp, exp, items } = user;
  const userInfo = { level, str, def, hp, exp, items };

  const map = await Map.findById(user.map);
  const event = map.event;
  res.send({ userInfo, map, event });
});

module.exports = router;
