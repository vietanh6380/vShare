/**
 * Created by gaumeo on 5/14/16.
 */
/**
 * Class helper for get information images to sidebar
 */
var Models = require('../models');
module.exports = {
    popular: function (callback) {
        Models.Image.find({}, {}, {limit: 9, sort: {likes: -1}},
            function (err, images) {
                if (err) throw err;

                callback(null, images);
            });
    }
};