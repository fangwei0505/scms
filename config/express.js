/**
 * Created by Commissar on 16/7/19.
 */

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');


module.exports = function () {

    console.log('init express');
    var app = express();

    // app.use(logger('dev'));
    // app.set('views', path.join(__dirname, 'public'));
    // app.set('view engine', 'html');

    // app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(express.static('./public'));
    // app.use(cookieParser());

    require('../app/routes/news.server.routes')(app);

    //404
    app.use(function (req, res, next) {
        res.status(404);
        try {
            return res.json('Not Found');
        } catch (e) {
            console.error('404 set header after sent');
        }
    })

    //500
    app.use(function (err, req, res, next) {
        if (!err) {
            return next();
        }
        res.status(500);
        try {
            return res.json(err.message || 'server error');
        } catch (e) {
            console.error('500 set header after sent');
        }
    })

    return app;
}