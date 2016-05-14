/**
 * Created by gaumeo on 5/14/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/mongotest');
mongoose.connection.on('open', function () {
    console.log('Mongoose connected.');
});

var Account = new Schema({
    username: {type: String},
    date_created: {type: Date, default: Date.now},
    visits: {type: Number, default: 0},
    active: {type: Boolean, default: false},
    age: {type: Number, require: true, min: 18, max: 65}
});

Account.statics.findByAgeRange = function (min, max, callback) {
    this.find({age: {$gt: min, $lt: max}}, callback);

}

var AccountModel = mongoose.model('Account', Account);
AccountModel.findByAgeRange(10, 30, function (err, accounts) {
    console.log(accounts.length);
})