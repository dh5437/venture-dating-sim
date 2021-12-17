const mongoose = require('mongoose');
const {Schema} = mongoose;

const monsterSchema = new Schema({
    name : String,
    maxhp : Number,
    hp : Number,
    exp : Number,
    str : Number,
})

const Monster = mongoose.model('Monster', monsterSchema);
module.exports = Monster;