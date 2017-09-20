var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/config');
require('../auth/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require("../model/User");
var schema = require("../model/Schema");
//var Book = require("../models/book");

router.post('/signup', function(req, res) {
  if (!req.body.email || !req.body.password) {
    res.json({success: false, msg: 'Please pass email and password.'});
  } else {
    var newUser = new User({
      email: req.body.email,
      password: req.body.password
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'email already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});

router.post('/signin', function(req, res) {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
        	// let payload = {
        	// 	id: req.body.id,email:req.body.email
        	// };
        	console.log(user);
          // if user is found and password is right create a token
          var token = jwt.sign({user}, 'secretkey',{expiresIn:5000});
          // return the information including token as JSON
          res.json({success: true, token: 'Bearer ' + token});
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
 });
getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

router.get('/geta', passport.authenticate('jwt', { session: false}), function(req, res) {
	console.log("hiiii");
	res.send("worked"+req.user._id);
  //var token = getToken(req.headers);
  // if (token) {
  //   schema.find(function (err, books) {
  //     if (err) return next(err);
  //     res.json(books);
  //   });
  // } else {
  //   return res.status(403).send({success: false, msg: 'Unauthorized.'});
  // }
}

);

/*router.get('/',(req,res)=>{
	Details.find({})
	.exec((err,result)=>{
		if(err)
			console.log('Error occured');
		else
			res.json(result);
	});
})*/


module.exports = router;