/**
 * Created by gaumeo on 5/13/16.
 */
var sidebar = require('../helpers/sidebar');
var ImageModel = require('../models').Image;
module.exports = {
    index: function (req, res) {
        var viewModel = {
            images: []
        };
        ImageModel.find({}, {}, {sort: {timestamp: -1}}, function (err, images) {
            if (err) throw err;
            viewModel.images = images;
            sidebar(viewModel, function () {
                res.render('index', viewModel);
            });
        });
    }
};