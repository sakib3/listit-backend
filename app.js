var express = require('express'),
app = express(),
bodyParser = require('body-parser'),
passport = require('passport'),
session = require('express-session'),
secret = require('./secret'),
router = require('./routes.js'),
config = require('./_config');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('jwtTokenSecret', secret.jwtTokenSecret);
app.use(passport.initialize());
app.use(passport.session(false));
app.use("/",router);
app.use("*",function(req,res){
	res.status(400).send({ error: 'Not found' });
});

var port = process.env.NODE_ENV == 'production' ? process.env.PORT || process.env.PROD_PORT : config.serverPORT[process.env.NODE_ENV];

app.listen(port);
console.log('Running on port '+ port+' ....');
