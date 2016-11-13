var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	passport = require('./middlewares/passport');
var config = require('./_config');
//var jwtauth = require('./jwtauth.js');

var mongo_uri = process.env.NODE_ENV == 'production' ? process.env.DB_URL : config.mongoURI[process.env.NODE_ENV];
Employee = require('./models/employee');
Company = require('./models/company');
Order = require('./models/order');
Product = require('./models/product');

var jwtauth = require('./middlewares/jwtauth'),
	policy = require('./policies/resource.access');


// connect to Mongoose
mongoose.connect(mongo_uri , function(err, res) {
  if(err) {
    console.log('Error connecting to the database url : '+ mongo_uri + err);
  } else {
    console.log('Connected to Database: ' + mongo_uri);
  }
});

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get('/', function(req, res){
	res.send('Pleas use api ...');
});

router.post('/admin/login', function(req, res){
	passportAuthenticateUser(req, res);
});

router.post('/employees/login', function(req, res){
	passportAuthenticateUser(req, res);
});

router.post('/employees/signup', function(req, res){
	//get post data
	var employee = req.body;
	Employee.addEmployee(employee, function(err, employee){
		if(err){
			res.json(err);
		}
		var secret = req.app.get('jwtTokenSecret');
		jwtauth.generateToken(secret,employee,function(response_token){
			res.status(200);
			return res.json(response_token);
		});
	});
});

router.all(/^\/api\/((?!employees).)*$/,jwtauth.decodeToken);

//not ready!
router.get('/api/employees', policy.accessOnlyIfFoundInUsersList, function(req, res){
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
	Employee.addEmployee(employee, function(err, employee){
		if(err){
			res.json(err);
		}
		res.json(employee);
	});
});

router.get('/api/employees/:_id', function(req, res){
	Employee.getEmployeeById(req.params._id,function(err, employee){
		if(err){
			res.json(err);
		}
		res.json(employee);
	});
});

router.get('/api/employees/login', isLoggedIn, function(req, res){
	res.json({'message': 'user is LoggedIn'});
});

router.post('/api/companies', policy.accessOnlyIfFoundInAdminList, function(req, res){
	var company = req.body;
	Company.addCompany(company, function(err, company){
		if(err){
			res.json(err);
		}
		res.json({company:company});
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

router.get('/api/products', function(req, res){
	Product.getProducts(function(err, products){
		if(err){
			res.json(err);
		}
		res.json(products);
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


// <<<<< Test Perpose Only -----
router.post('/employees/chkauth', jwtauth.decodeToken, function(req, res){

	return res.send(req._currentIdentifierFromToken);

});
//       Test Perpose Only >>>>>

function passportAuthenticateUser(req, res){
	var strategy = req.url.match(/employees/g)=='employees' ? 'local' : 'local-admin';
	passport.authenticate(strategy, function(err, user, info) {
		if (err) { return next(err); }

		if (!user) {
			res.status(403);
			return res.send({message: 'user not found!'});
		}

		var secret = req.app.get('jwtTokenSecret');

		jwtauth.generateToken(secret,user,function(response_token){
			res.status(200);
			return res.json(response_token);
		});
	})(req, res);
}
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.json({'message': 'user is not LoggedIn'});
}

module.exports= router;
