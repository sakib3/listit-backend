var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

// Employee Schema
var employeeSchema = Schema({
	first_name: String,
	last_name: String,
	address: String,
	city_name: String,
	post_code: Number,
	email: String,
	mobile: Number,
	password: String,
	confirmed: { type: Boolean, default: true,index: true },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
	companies: [{ type: Schema.Types.ObjectId, ref: 'company' }]
});

var Employee = module.exports = mongoose.model('Employee', employeeSchema, 'employee');

//get Employees
module.exports.getEmployees = function(callback, limit){
	Employee.find(callback).limit(limit);
}

//get the Employee
module.exports.getEmployeeById = function(id, callback){
	Employee.findById(id,callback);
}