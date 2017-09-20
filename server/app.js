var http = require('http');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport=require('passport');
var jwt = require('jsonwebtoken');
var add = require('./routes/add');
var getdata = require('./routes/getdata');
var deletes = require('./routes/deletes');
var updates = require('./routes/updates');
var adduser = require('./routes/adduser');
var getuser = require('./routes/getuser');
//var JwtStrategy = require('passport-jwt').Strategy;  
var Details = require('./model/Schema');
var userDetail = require('./model/User');
var path = require('path');
var api = require('./routes/api');
var fs = require('fs');
var morgan = require('morgan');
var cors = require('cors');
let app=express();

//app.use(express.static(path.join(__dirname, 'public')));
//database connection
let db='mongodb://localhost/nishant';
mongoose.connect(db,{useMongoClient:true});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(passport.initialize());

let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})
app.use(morgan('combined', {stream: accessLogStream}))


app.use(passport.initialize());  
require('./auth/passport')(passport); 

var apiRoutes = express.Router();  
apiRoutes.post('/register', function(req, res) {  
  if(!req.body.email || !req.body.password) {
    res.json({ success: false, message: 'Please enter email and password.' });
  } else {
    var newUser = new userDetail({
      email: req.body.email,
      password: req.body.password
    });

    // Attempt to save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({ success: false, message: 'That email address already exists.'});
      }
      res.json({ success: true, message: 'Successfully created new user.' });
    });
  }
});

// Authenticate the user and get a JSON Web Token to include in the header of future requests.
apiRoutes.post('/authenticate', function(req, res) {  
  userDetail.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.send({ success: false, message: 'Authentication failed. User not found.' });
    } else {
      // Check if password matches
      user.comparePassword(req.body.password, function(err, isMatch) {
        if (isMatch && !err) {
          // Create token if the password matched and no error was thrown
          var token = jwt.sign(user, config.secret, {
            expiresIn: 10080 // in seconds
          });
          res.json({ success: true, token: 'JWT ' + token });
        } else {
          res.send({ success: false, message: 'Authentication failed. Passwords did not match.' });
        }
      });
    }
  });
});

// Protect dashboard route with JWT
apiRoutes.get('/dashboard', passport.authenticate('jwt', { session: false }), function(req, res) {  
  res.send('It worked! User id is: ' + req.user._id + '.');
});

// Set url for API group routes
app.use('/api', api);  

app.get('/',(req,res)=>{
	res.send('Hello');
});
//get data from collection 

app.use('/getdata',getdata);

app.use('/getuser',getuser);//for user login
app.use('/add',add);

app.use('/adduser',adduser);//for user registration
//delete from collection
app.use('/deletes',deletes);
//update the collection
app.use('/updates',updates);

http.createServer(app).listen(3001, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');
module.exports = app;
