const mongoose = require('mongoose');
const {Schema} = mongoose;

const coordinateSchema = new Schema({
    x : Number,
    y : Number,
});

const Coordinate = mongoose.model('Coordinate', coordinateSchema);
module.exports = Coordinate;