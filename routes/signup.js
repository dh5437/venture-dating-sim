const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const { Coordinate, User, Map, Item } = require('../models');
const { encryptPassword } = require('../utils');
router.post(
  '/',
  body('username')
    .isAlphanumeric()
    .withMessage('error : username should be written alphanumerically')
    .isLength({ max: 30 })
    .withMessage('error : username must be between 4-12 words'),
  body('password')
    .isLength({ min: 8, max: 16 })
    .withMessage('error : Password should be longer than 8 words, shorter than 16 words'),
  body('name')
    .isAlphanumeric()
    .withMessage('error : name should be written alphanumerically')
    .isLength({ min: 4, max: 12 })
    .withMessage('error : name should be longer than 4 words, shorter than 12 words'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    const { name, username, password } = req.body;
    const encryptedPassword = encryptPassword(password);
    let user = null;
    try {
      const coordinate = await Coordinate.findOne({ x: 0, y: 0 });
      const map = await Map.findOne({ coordinate: coordinate });
      user = new User({
        username: username,
        password: encryptedPassword,
        name: name,
        level: 1,
        maxHp: 100,
        hp: 100,
        exp: 0,
        str: 10,
        def: 5,
        turn: 0,
        map: map,
      });
      await user.save();
    } catch (err) {
      return res.status(400).send({ error: 'username is duplicated' });
    }

    const items = await Item.find({ isActive: true });
    for (const _item of items) {
      const item = new Item({
        name: _item.name,
        quantity: 0,
        hp: _item.hp,
        exp: _item.exp,
        str: _item.str,
        id: _item.id,
        user,
        isActive: true,
      });
      await item.save();
    }
    res.send(200);
  },
);

module.exports = router;
