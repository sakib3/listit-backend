// load up the user model
var jwt = require('jwt-simple'),
    moment = require('moment');

module.exports.generateToken = function (secret, user, callback){
    var expires = moment().add('days', 7).valueOf();
    var token = jwt.encode({
      iss: user.id,
      exp: expires
    },secret);
    var response_token = {
      token : token,
      expires: expires,
      user: user.toJSON()
    };
    callback(response_token);
};

module.exports.decodeToken = function(req, res, next) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    if (token) {
        try {
            var secret = req.app.get('jwtTokenSecret');
            var decoded = jwt.decode(token, secret);

            if (decoded.exp <= Date.now()) {
              res.json({
                "status": 400,
                "message": "Oops something went wrong",
                "error": 'Access token has expired'
              });
            }
            req._currentIdentifierFromToken = decoded;
            return next();

        } catch (err) {
          res.status(500);
            res.json({
              "status": 500,
              "message": "Oops something went wrong",
              "error": err.message
            });
        }
    } else {
      res.json({
        "status": 400,
        "message": "Oops something went wrong",
        "error": 'Access token not found'
      });
    }
};
