var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


// connect to Mongoose
mongoose.connect('mongodb://localhost/listit')
var db = mongoose.connection;

app.get('/', function(req, res){
	res.send('Listit');
});


app.listen(3000);
console.log('Running on port 3000 ....');