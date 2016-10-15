
var MongoClient = require('mongodb').MongoClient,
    config = require('../_config');

var admin = {
  first_name : "Test",
	last_name : "Admin",
	address : "Test Address",
	city_name : "Stockholm",
	post_code : 11251,
	email : "admin@listit.dk",
	mobile : 45712345678,
	password : "123456"
};

var url= config.mongoURI[process.env.NODE_ENV];
console.log(url);
// Establish connection to db
MongoClient.connect(url, {native_parser:true},function(err, db){
        // Drop the collection from this world
        console.log(db);
        db.createCollection("admin", function(err, theCollection) {
          console.log("admin collection is created...");
          theCollection.insert(admin,function(){
            console.log('closing db');
            db.close();
          });
        });
});
