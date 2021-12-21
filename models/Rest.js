const mongoose = require('mongoose');
const { Schema } = mongoose;

const restSchema = new Schema({
  id: Number,
  description: String,
});

const Rest = mongoose.model('Rest', restSchema);
module.exports = Rest;
