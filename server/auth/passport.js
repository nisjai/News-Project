var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

var User = require('../model/User');
var config = require('../config/config'); 

module.exports = function(passport) {
	console.log(passport);
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = 'secretkey';
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne(jwt_payload.id, function(err, user) {
          if (err) {
              return done(err, false);
          }
          if (user) {
              done(null, user);
          } else {
              done(null, false);
          }
      });
  }));
};