/**
 * Created by gaumeo on 5/12/16.
 */
var express = require('express');

var app = express();

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.listen(3000);