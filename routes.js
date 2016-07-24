var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	passport = require('./middlewares/passport');

//var jwtauth = require('./jwtauth.js');

Employee = require('./models/employee');
Company = require('./models/company');
Order = require('./models/order');
Product = require('./models/product');

var jwtauth = require('./middlewares/jwtauth');



// connect to Mongoose
mongoose.connect('mongodb://localhost/listit')
var db = mongoose.connection;

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get('/', function(req, res){
	res.send('Pleas use api ...');
});

router.post('/employees/login', function(req, res){

	passport.authenticate('local', function(err, user, info) {
		if (err) { return next(err); }

		if (!user) {
			res.status(403);
			return res.send({message: info.message});
		}

		var secret = req.app.get('jwtTokenSecret');

		jwtauth.generateToken(secret,user,function(response_token){
			res.status(200);
			return res.json(response_token);
		});
	})(req, res);

});


router.get('/employees/chkauth', [jwtauth.decodeToken], function(req, res){

	return res.send({message: req.decoded});

});

router.all('/api/*', [jwtauth.decodeToken] );

router.get('/api/employees', function(req, res){
	Employee.getEmployees(function(err, employees){
		if(err){
			res.json(err);
		}
		res.json(employees);
	});
});

router.post('/api/employees', function(req, res){
	//get post data
	var employee = req.body;
	console.log(employee);
	Employee.addEmployee(employee, function(err, employee){
		if(err){
			res.json(err);
		}
		res.json(employee);
	});
});


router.get('/api/employees/login', isLoggedIn, function(req, res){

	res.json({'message': 'user is LoggedIn'});


});

router.get('/api/employees/:_id', function(req, res){
	Employee.getEmployeeById(req.params._id,function(err, employee){
		if(err){
			res.json(err);
		}
		res.json(employee);
	});
});






router.get('/api/companies', function(req, res){
	Company.getCompanies(function(err, companies){
		if(err){
			res.json(err);
		}
		res.json(companies);
	});
});

router.get('/api/orders', function(req, res){
	Order.getOrders(function(err, orders){
		if(err){
			res.json(err);
		}
		res.json(orders);
	});
});

router.get('/api/products', function(req, res){
	Product.getProducts(function(err, products){
		if(err){
			res.json(err);
		}
		res.json(products);
	});
});

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.json({'message': 'user is not LoggedIn'});
}

module.exports= router;
