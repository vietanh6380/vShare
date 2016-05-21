/**
 * Created by gaumeo on 5/14/16.
 */
/**
 * Class helper for get information comment to sidebar
 */
var Models = require('../models');
var async = require('async');
module.exports = {
    newest: function (callback) {
        Models.Comment.find({}, {}, {limit: 5, sort: {'timestamp': -1}},
            function (err, comments) {
                console.log("Comments")
                console.log(comments)
                var attachImage = function (comment, next) {
                    Models.Image.findOne({_id: comment.image_id},
                        function (err, image) {
                            if (err) throw err;

                            comment.image = image;
                            next(err);
                        });
                };

                async.each(comments, attachImage,
                    function (err) {
                        if (err) throw err;
                        callback(err, comments);
                    });
            });
    }
};