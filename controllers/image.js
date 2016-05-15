/**
 * Created by gaumeo on 5/13/16.
 */
var fs = require('fs');
var path = require('path');
var sidebar = require('../helpers/sidebar');
var Models = require('../models');
var md5 = require('md5');

module.exports = {
    index: function (req, res) {
        var viewModel = {
            image: {},
            comments: []
        };
        Models.Image.findOne({filename: {$regex: req.params.image_id}}, function (err, image) {
            if (err) throw err;
            if (image) {
                image.views = image.views + 1;
                viewModel.image = image;
                image.save();

                Models.Comment.find({image_id: image._id}, {}, {sort: {timestamp: 1}}, function (err, comments) {
                    if (err) throw err;
                    viewModel.comments = comments;
                    sidebar(viewModel, function (viewModel) {
                        res.render('image', viewModel);
                    });
                });
            } else {
                res.redirect('/');
            }
        });
    },
    create: function (req, res) {
        var saveImage = function () {
            var possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
            var imageUrl = '';
            // generate uniqueId image
            for (var i = 0; i < 6; i++) {
                imageUrl += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            // Check image exist from URL if exist try again (start over)
            Models.Image.find({filename: imageUrl}, function (err, images) {
                if (images.length > 0) {
                    saveImage();
                } else {
                    // tempPath file after upload vid form
                    var tempPath = req.files.file.path;
                    console.log(tempPath);
                    // type of file
                    var fileType = path.extname(req.files.file.name).toLowerCase();
                    // targetPath of file
                    var targetPath = path.resolve('./public/upload/' + imageUrl + fileType);

                    if (fileType === '.png' || fileType === '.jpg' || fileType === '.gif' || fileType === '.jpeg') {
                        // move file from temp to target folder
                        fs.rename(tempPath, targetPath, function (err) {
                            if (err) throw err;
                            // save image to database
                            var newImg = new Models.Image({
                                title: req.body.title,
                                filename: imageUrl + fileType,
                                description: req.body.description,
                            });
                            newImg.save(function (err, image) {
                                if (err) throw err;
                                res.redirect('/images/' + image.uniqueId);
                            });
                        });
                    } else {
                        // remove file valid in temp folder
                        fs.unlink(tempPath, function (err) {
                            if (err) throw err;
                            res.json(500, {error: 'Only image files are allowed'});
                        });
                    }
                }
            });
        };
        saveImage();
    },

    like: function (req, res) {
        // Get Image need like
        Models.Image.findOne({filename: {$regex: req.params.image_id}},
            function (err, image) {
                // count like
                if (!err && image) {
                    image.likes = image.likes + 1;
                    image.save(function (err) {
                        if (err) {
                            res.json(err);
                        } else {
                            res.json({likes: image.likes});
                        }
                    });
                }
            });
    },

    comment: function (req, res) {
        // find images need comment
        Models.Image.findOne({filename: {$regex: req.params.image_id}},
            function (err, image) {
                if (!err && image) {
                    // get new comment form form
                    var newComment = new Models.Comment(req.body);
                    console.log("Comment...");
                    console.log(req.body);
                    newComment.gravatar = md5(newComment.email);
                    newComment.image_id = image._id;
                    newComment.save(function (err, comment) {
                        if (err) {
                            throw err;
                        }
                        res.redirect('/images/' + image.uniqueId + '#' + comment._id);
                    });
                } else {
                    res.redirect('/');
                }
            });
    },

    remove: function (req, res) {
        Models.Image.findOne({filename: {$regex: req.params.image_id}},
            function (err, image) {
                if (err) {
                    throw err;
                }
                // remove file on server
                fs.unlink(path.resolve('./public/upload/' + image.filename),
                    function (err) {
                        if (err) {
                            throw err;
                        }
                        // remove comment on image
                        Models.Comment.remove({image_id: image._id},
                            function (err) {
                                image.remove(function (err) {
                                    if (!err) {
                                        res.json(true);
                                    } else {
                                        res.json(false);
                                    }
                                });
                            });
                    });
            });
    }
};