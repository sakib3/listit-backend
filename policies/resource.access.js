
//var jwtauth = require('./jwtauth.js');

Admin = require('../models/admin');

module.exports.accessOnlyIfFoundInUsersList = function(req,res, next){

  if(1==2)
    res.json({
                "status": 400,
                "message": "Oops something went wrong",
                "error": 'Access Denied'
    });
  return next();
};

module.exports.accessOnlyIfFoundInAdminList = function(req,res, next){
  var id = req._currentIdentifierFromToken.iss;
  Admin.getAdminById(id,function(err, admin){
		if(err){
			res.json(err);
		}
		return next();
	});
};
