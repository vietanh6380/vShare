/**
 * Created by gaumeo on 5/12/16.
 */
var MongoClient = require('mongodb').MongoClient;

var urlConnection = 'mongodb://admin:123456@ds017582.mlab.com:17582/nodeblog';
var sampleCollection = 'chapters';

//We need to insert these chapters into mongoDB
var chapters = [{
    'Title': 'Snow Crash',
    'Author': 'Neal Stephenson'
}, {
    'Title': 'Snow Crash',
    'Author': 'Neal Stephenson'
}];

MongoClient.connect(urlConnection, function (err, db) {
    if (err) return err;

    console.log('Connected to server');

    var collection = db.collection(sampleCollection);

    collection.insert(chapters, function (err, data) {
        if (err) {
            console.log('Insert err')
        }
        else {
            console.log('Insert : ' + data.ops.length + ' chapters inserted');
        }
        db.close();
    })
});