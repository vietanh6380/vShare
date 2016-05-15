/**
 * Created by gaumeo on 5/13/16.
 */
var home = require('../controllers/home');
var image = require('../controllers/image');

module.exports.initialize = function (app) {
    // Create RESTful API for application
    app.get('/', home.index);
    app.get('/images/:image_id', image.index);
    app.post('/images/', image.create);
    app.post('/images/:image_id/like', image.like);
    app.post('/images/:image_id/comment', image.comment);
    app.delete('/images/:image_id', image.remove);
};