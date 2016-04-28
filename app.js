var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//initialize body parser
app.use(bodyParser.json());

Employee = require('./models/employee');
Company = require('./models/company');
Order = require('./models/order');
Product = require('./models/product');

// connect to Mongoose
mongoose.connect('mongodb://localhost/listit')
var db = mongoose.connection;

app.get('/', function(req, res){
	res.send('Pleas use api ...');
});

app.get('/api/employees', function(req, res){
	Employee.getEmployees(function(err, employees){
		if(err){
			res.json(err);
		}
		res.json(employees);
	});
});

app.post('/api/employees', function(req, res){
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

app.get('/api/employees/:_id', function(req, res){
	Employee.getEmployeeById(req.params._id,function(err, employee){
		if(err){
			res.json(err);
		}
		res.json(employee);
	});
});

app.get('/api/companies', function(req, res){
	Company.getCompanies(function(err, companies){
		if(err){
			res.json(err);
		}
		res.json(companies);
	});
});

app.get('/api/orders', function(req, res){
	Order.getOrders(function(err, orders){
		if(err){
			res.json(err);
		}
		res.json(orders);
	});
});

app.get('/api/products', function(req, res){
	Product.getProducts(function(err, products){
		if(err){
			res.json(err);
		}
		res.json(products);
	});
});

app.listen(3000);
console.log('Running on port 3000 ....');