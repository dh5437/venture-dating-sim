const mongoose = require('mongoose');
const {Schema} = mongoose;

const mapSchema = new Schema({
    coordinate : {type : Schema.Types.ObjectId, ref : 'Coordinate'},
    event : String,
})

const Map = mongoose.model('Map', mapSchema);
module.exports = Map;