/**
 * Created by Commissar on 16/7/20.
 */
var mongoose = require('mongoose');
var config = require('./config');

module.exports = function () {
    var db = mongoose.connect(config.mongodb);
    require('../app/models/news.server.model');
    return db;
}