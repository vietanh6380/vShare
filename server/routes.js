/**
 * Created by gaumeo on 5/13/16.
 */
var home = require('../controllers/home');
var image = require('../controllers/image');

// Create RESTful API for application
module.exports.initialize = function (app) {
    // GET HOME INDEX
    app.get('/', home.index);
    
    // GET IMAGE BY IMAGE_ID
    app.get('/images/:image_id', image.index);
    
    // POST IMAGE
    app.post('/images/', image.create);
    
    //POST LIKE FOR IMAGE
    app.post('/images/:image_id/like', image.like);
    
    //POST COMMENT FOR IMAGE
    app.post('/images/:image_id/comment', image.comment);
    
    // DELETE IMAGE
    app.delete('/images/:image_id', image.remove);
};