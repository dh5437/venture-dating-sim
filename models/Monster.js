const mongoose = require('mongoose');
const { Schema } = mongoose;

const monsterSchema = new Schema({
  name: String,
  maxHp: Number,
  hp: Number,
  exp: Number,
  str: Number,
  def: Number,
  id: Number,
});

const Monster = mongoose.model('Monster', monsterSchema);
module.exports = Monster;
