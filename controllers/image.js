/**
 * Created by gaumeo on 5/13/16.
 */
var fs = require('fs');
var path = require('path');
var sidebar = require('./helpers/sidebar');

module.exports = {
    index: function (req, res) {
        var viewModel = {
            image: {
                uniqueId: 1,
                title: 'Sample Image 1',
                description: 'This is a sample.',
                filename: 'sample1.jpg',
                views: 0,
                likes: 0,
                timestamp: Date.now()
            },
            comments: [
                {
                    image_id: 1,
                    email: 'test@testing.com',
                    name: 'Test Tester',
                    gravatar: 'http://lorempixel.com/75/75/animals/1',
                    comment: 'This is a test comment...',
                    timestamp: Date.now()
                }, {
                    image_id: 1,
                    email: 'test@testing.com',
                    name: 'Test Tester',
                    gravatar: 'http://lorempixel.com/75/75/animals/2',
                    comment: 'Another followup comment!',
                    timestamp: Date.now()
                }
            ]
        };
        sidebar(viewModel, function (viewModel) {
            res.render('image', viewModel);
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
                    res.redirect('/images/' + imageUrl);
                });
            } else {
                // remove file valid in temp folder
                fs.unlink(tempPath, function (err) {
                    if (err) throw err;
                    res.json(500, {error: 'Only image files are allowed'});
                });
            }
        }
        saveImage();
    },

    like: function (req, res) {
        res.send('The image:like POST controller');
    },

    comment: function (req, res) {
        res.send('The image:comment POST controller');
    }
};