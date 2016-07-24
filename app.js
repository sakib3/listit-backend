var express = require('express'),
app = express(),
bodyParser = require('body-parser'),
passport = require('passport'),
session = require('express-session'),
secret = require('./secret'),
router = require('./routes.js');

app.use(bodyParser.json());
app.set('jwtTokenSecret', secret.jwtTokenSecret);
app.use(passport.initialize());
app.use(passport.session(false));
app.use("/",router);
app.use("*",function(req,res){
	res.status(400).send({ error: 'Not found' });
});

app.listen(3000);
console.log('Running on port 3000 ....');
