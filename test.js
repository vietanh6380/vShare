/**
 * Created by gaumeo on 5/14/16.
 */
var mongoClient = require('mongodb').MongoClient;

mongoClient.connect('mongodb://localhost:27017/myproject', function (err, db) {
    if (err) throw err;
    console.log('Connected to MongoDB !!');

    var collection = db.collection('testing');
    collection.insert({'title': 'Viet Anh'}, function (err, docs) {
        console.log(docs.ops.length + ' record inserted');
        console.log(docs.ops[0].title + '-' + docs.ops[0]._id);
        db.close();
    });
});