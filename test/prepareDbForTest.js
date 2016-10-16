var MongoClient = require('mongodb').MongoClient,
    config = require('../_config');

var url= config.mongoURI[process.env.NODE_ENV];
// Establish connection to db
MongoClient.connect(url, {native_parser:true},function(err, db){
        // Drop the collection from this world
        db.dropCollection("employee", function(err, result) {
          console.log("employee collection is deleting...");
          db.close();
        });
});

MongoClient.connect(url, {native_parser:true},function(err, db){
        // Drop the collection from this world
        db.dropCollection("admin", function(err, result) {
          console.log("admin collection is deleting...");
          db.close();
        });
});

MongoClient.connect(url, {native_parser:true},function(err, db){
        // Drop the collection from this world
        db.dropCollection("company", function(err, result) {
          console.log("company collection is deleting...");
          db.close();
        });
});
