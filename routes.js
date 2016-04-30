var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
Employee = require('./models/employee');
Company = require('./models/company');
Order = require('./models/order');
Product = require('./models/product');

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

module.exports= router;