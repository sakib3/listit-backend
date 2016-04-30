var express = require('express');
var app = express();

var bodyParser = require('body-parser');
router = require('./routes.js');

//initialize body parser
app.use(bodyParser.json());



app.use("/",router);

app.use("*",function(req,res){
	res.status(400).send({ error: 'Not found' });
});

app.listen(3000);
console.log('Running on port 3000 ....');