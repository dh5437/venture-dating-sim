const mongoose = require('mongoose');

const Coordinate = require('./Coordinate');
const Item = require('./Item');
const Key = require('./Key');
const Map = require('./Map');
const Monster = require('./Monster');
const User = require('./User');

const mongoURL = 'mongodb://venture:<password>@cluster0-shard-00-00.cpqk4.mongodb.net:27017,cluster0-shard-00-01.cpqk4.mongodb.net:27017,cluster0-shard-00-02.cpqk4.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-8n3khm-shard-0&authSource=admin&retryWrites=true&w=majority';

mongoose.connect(mongoURL);
if(mongoose.connect(mongoURL))  console.log('connected to DB')

module.exports = {
    Coordinate,
    Item,
    Key,
    Map,
    Monster,
    User,
}