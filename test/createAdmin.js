
var MongoClient = require('mongodb').MongoClient,
    config = require('../_config'),
    bcrypt = require('bcrypt-nodejs');

var admin = {
  first_name : "Test",
	last_name : "Admin",
	address : "Test Address",
	city_name : "Stockholm",
	post_code : 11251,
	email : "admin@listit.dk",
	mobile : 45712345678,
	password : hashPassword("123456")
};
var SALT_WORK_FACTOR = 10;

function hashPassword(password){
    var salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
    var hash = bcrypt.hashSync(password, salt);
    return hash;
}
var url= config.mongoURI[process.env.NODE_ENV];
// Establish connection to db
MongoClient.connect(url, {native_parser:true},function(err, db){
        // Drop the collection from this world
        db.createCollection("admin", function(err, theCollection) {
          console.log("admin collection is created...");
          theCollection.insert(admin,function(){
            console.log('closing db');
            db.close();
          });
        });
});
