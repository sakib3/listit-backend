var mongoose = require('mongoose'),
	bcrypt = require('bcrypt-nodejs'),
	SALT_WORK_FACTOR = 10,
	Schema = mongoose.Schema;

// Employee Schema
var employeeSchema = Schema({
	first_name: String,
	last_name: String,
	address: String,
	city_name: String,
	post_code: Number,
	email: { 
			type: String,
			validate: {
	          	validator: function(v, cb) {
	            Employee.find({email: v}, function(err,docs){
	               cb(docs.length == 0);
	            });
	        },
          	message: 'Employee already exists!'
        } 
    },
	mobile: Number,
	password: String,
	confirmed: { type: Boolean, default: true,index: true },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
	companies: [ { type: Schema.Types.ObjectId, ref: 'Company' } ]
});


//Before saving Employee perform additional task like hash password
employeeSchema.pre('save', function(next) {
    var employee = this;

    // only hash the password if it has been modified (or is new)
    if (!employee.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(employee.password, salt, null, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            employee.password = hash;
            next();
        });
    });
});

var Employee = module.exports = mongoose.model('Employee', employeeSchema, 'employee');

//get Employees
module.exports.getEmployees = function(callback, limit){
	Employee.find(callback).limit(limit);
}

//get the Employee
module.exports.getEmployeeById = function(id, callback){
	Employee.findById(id)
			.populate('companies')
			.exec(callback);
}

//add Employee
module.exports.addEmployee = function(employee, callback){
	Employee.create(employee, callback);
}

module.exports.getUserByUsername = function(username, callback){
	var query = {email: username};
	Employee.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}
