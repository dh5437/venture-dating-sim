const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemSchema = new Schema({
  name: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  quantity: Number,
  hp: Number,
  exp: Number,
  str: Number,
  id: Number,
  description: String,
  isActive: Boolean,
});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;
