/**IMAGE
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

    // Set up view engineq
    app.engine('handlebars', exphbs.create({
        defaultLayout: 'main',
        layoutsDir: app.get('views') + '/layouts',
        partialsDir: [app.get('views') + '/partials'],
        helpers: {
            timeago: function (timestamp) {
                console.log(timestamp);
                return moment(timestamp).startOf('minute').fromNow();
            }
        }
    }).engine);
    app.set('view engine', 'handlebars');

    //set up logging and debug
    app.use(morgan('dev'));
    // set up body parser for router
    app.use(bodyParser.urlencoded({'extended': true}));
    app.use(bodyParser.json());
    // set up for file upload
    app.use(multer({dest: path.join(__dirname, 'public/upload/temp')}));

    // set up for browser old version not support DELETE and UPDATE
    app.use(methodOverride());

    // set up for cookie parser
    app.use(cookieParser('some-secret-value-here'));

    // initialize middleware for app
    routes.initialize(app);
    
    // setting public resource
    app.use('/public/', express.static(path.join(__dirname, '../public')));

    if ('development' === app.get('env')) {
        app.use(errorHandler());
    }

    return app;
};