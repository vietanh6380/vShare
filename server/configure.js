/**
 * Created by gaumeo on 5/13/16.
 */
var path = require('path');
var routes = require('./routes');
var exphbs = require('express-handlebars');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var methodOverride = require('method-override');
var errorHandler = require('errorhandler');
var moment = require('moment');
var multer = require('multer');

module.exports = function (app) {
    // using module morgan for logging
    app.use(morgan('dev'));
    // using module bodyparse for packing of any form fields that are submitted via a HTML form submission from a browser
    app.use(bodyParser({'extended': true}));
    app.use(bodyParser.json());
    app.use(multer({
        dest: path.join(__dirname + '/public/upload/temp')
    }))
    ;
    // using module methodOverride fake REST HTTP Vebrs such as UPDATE , PUT .. for old browser
    app.use(methodOverride());
    // using sent/received cookie
    app.use(cookieParser('secret-cookie'));
    // using declare router of application
    routes(app);
    // using working static resource in public folder
    app.use('/public/', express.static(path.join(__dirname + '../public')));

    // using handler error . example : render 404 page, return error
    if (app.get('env') === 'developement') {
        app.use(errorHandler());
    }

    // using view engine handlebars
    app.engine('handlebars', exphbs.create({
        defaultLayout: 'main',
        layoutDir: app.get('views' + '/layouts'),
        partialDir: [app.get('views' + '/partials')],
        helpers: {
            timeago: function (timestamp) {
                return moment(timestamp).startOf('minute').fromNow();
            }
        }
    }).engine);

    app.set('view engine', 'handlebars');
    return app;
};