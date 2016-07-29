var mongoose = require('mongoose'),
	bcrypt = require('bcrypt-nodejs'),
	SALT_WORK_FACTOR = 10,
	Schema = mongoose.Schema;

// Admin Schema
var adminSchema = Schema({
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
	updatedAt: { type: Date, default: Date.now }
});


//Before saving Admin perform additional task like hash password
adminSchema.pre('save', function(next) {
    var admin = this;

    // only hash the password if it has been modified (or is new)
    if (!admin.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(admin.password, salt, null, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            admin.password = hash;
            next();
        });
    });
});

var Admin = module.exports = mongoose.model('Admin', adminSchema, 'admin');

//get Admins
module.exports.getAdmins = function(callback, limit){
	Admin.find(callback).limit(limit);
}

//get the Admin
module.exports.getAdminById = function(id, callback){
	Admin.findById(id)
			.populate('companies')
			.exec(callback);
}

//add Admin
module.exports.addAdmin = function(admin, callback){
	Admin.create(admin, callback);
}

module.exports.getUserByUsername = function(username, callback){
	var query = {email: username};
	Admin.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}
