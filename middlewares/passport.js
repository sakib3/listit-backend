
// config/passport.js

// load all the things we need
var passport = require('passport');
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
//var User            = require('.././models/employee');

passport.use('local',new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(username, password, done) {
    Employee.getUserByUsername(username, function(err, user){
      if(err) throw err;
      if(!user){
          return done(null, false, {message: 'Unknown User'});
      }

    Employee.comparePassword(password, user.password, function(err, isMatch){
        if(err) throw err;

        if(isMatch)
          return done(null, user);
        return done(null, false, {message: 'Invalid password'});
    });
   });
}));

passport.use('local-admin',new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(username, password, done) {
    Admin.getUserByUsername(username, function(err, user){
      if(err) throw err;
      if(!user){
          return done(null, false, {message: 'Unknown User'});
      }

    Admin.comparePassword(password, user.password, function(err, isMatch){
        if(err) throw err;

        if(isMatch)
          return done(null, user);
        return done(null, false, {message: 'Invalid password'});
    });
   });
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Employee.getUserById(id, function(err, user) {
    done(err, user);
  });
});

module.exports = passport;
