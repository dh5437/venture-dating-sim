const express = require('express');
const router = express.Router();

const { setAuth } = require('../utils');
const { Rest } = require('../models');

router.get('/:id', setAuth, async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const rest = await Rest.findOne({ id });
  const message = rest.description;

  res.send({ user, message });
});

module.exports = router;
