const express = require('express');
const router = express.Router();

const { setAuth } = require('../utils');

router.get('/', setAuth, (req, res) => {
  const user = req.user;
  const { level, str, def, hp, exp, items } = user;
  const userInfo = { level, str, def, hp, maxHp, exp, items };
  const message = '그녀의 마음을 사로잡으러 가자 ><';
  res.send({ userInfo, event: 'rest', message });
});

module.exports = router;
