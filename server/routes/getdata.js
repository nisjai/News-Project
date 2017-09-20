var express =require('express');
let router = express.Router();
var Details =require('../model/Schema');

router.get('/',(req,res)=>{
	Details.find({})
	.exec((err,result)=>{
		if(err)
			console.log('Error occured');
		else
			res.json(result);
	});
})
module.exports = router;


/*
router.get('/book', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    Book.find(function (err, books) {
      if (err) return next(err);
      res.json(books);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});*/

/*
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
};*/