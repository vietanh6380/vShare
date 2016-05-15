/**
 * Created by gaumeo on 5/14/16.
 */
var Stats = require('./stats');
var Images = require('./images');
var Comments = require('./comment');
var async = require('async');

module.exports = function (viewModel, callback) {
    async.parallel([
        function (next) {
            Stats(next);
        },
        function (next) {
            Images.popular(next);
        },
        function (next) {
            Comments.newest(next);
        }
    ], function (err, results) {
        viewModel.sidebar = {
            stats: results[0],
            popular: results[1],
            comments: results[2]
        };

        callback(viewModel);
    });
};