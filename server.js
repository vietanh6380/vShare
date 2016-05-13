/**
 * Created by gaumeo on 5/12/16.
 */
var express = require('express');
var config = require('./server/configure');
var app = express();

// setting app express
app.set('port', process.env.port || 3000);
app.set('views', __dirname + '/views');

app = config(app);

app.get('/', function (req, res) {
    res.send('Hello world');
})
app.listen(app.get('port'), function () {
    console.log('Server is started at : localhost:' + app.get('port'));
});