
module.exports.accessOnlyIfFoundInUsersList = function(req,res, next){
  
  if(1==2)
    res.json({
                "status": 400,
                "message": "Oops something went wrong",
                "error": 'Access Denied'
    });
  return next();
};
