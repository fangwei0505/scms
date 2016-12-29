/**
 * Created by Commissar on 16/7/20.
 */
var mongoose = require('mongoose');
var NewsSchema = new mongoose.Schema({
    title: String,
    content: String,
    createTime: {type: Date, default: Date.now()}
})
var News = mongoose.model('News', NewsSchema);