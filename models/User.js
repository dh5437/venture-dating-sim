const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    username : {type : String, unique : true},
    password : String,
    name : String,
    keys : [{type: Schema.Types.ObjectId, ref:'Key'}],
    level : Number,
    items : [{type: Schema.Types.ObjectId, ref:'Item'}],
    maxhp : Number,
    hp : Number,
    exp : Number,
    str : Number,
    map : {type: Schema.Types.ObjectId, ref: 'Map'},
})

const User = mongoose.model('User', userSchema);
module.exports = User;