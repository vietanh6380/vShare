/**
 * Created by gaumeo on 5/12/16.
 */
/**
 * Main of project .
 */
var express = require('express');
var config = require('./server/configure');
var app = express();
var mongose = require('mongoose');
var connectionUrl = 'mongodb://admin:123456@ds017582.mlab.com:17582/nodeblog';

// setting app express
app.set('port', process.env.port || 3000);
app.set('views', __dirname + '/views');

app = config(app);

// setting connection to MongoDB
mongose.connect(connectionUrl);
mongose.connection.on('open', function () {
    console.log('Connected MongoDB Successfully !');
});

app.listen(app.get('port'), function () {
    console.log('Server is started at : localhost:' + app.get('port'));
});