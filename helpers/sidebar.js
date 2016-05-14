/**
 * Created by gaumeo on 5/14/16.
 */
var Stats = require('./stats');
var Images = require('./images');
var Comments = require('./comment');

module.exports = function (viewModel, callback) {
    viewModel.sidebar = {
        stats: Stats(),
        popular: Images.popular(),
        comment: Comments.newest()
    };

    callback(viewModel);
};