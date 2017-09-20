var express =require('express');
let router = express.Router();
var userDetail =require('../model/User');

/*router.post('/',(req,res)=>{
	userDetail.insertMany({
		name : req.body.name,
		email : req.body.email,
		password : req.body.password,
		gender : req.body.gender,
		age : req.body.age
	},(err,result)=>{
		if(err)
			console.log('Error in saving');
		else{
			console.log(result);
			res.send(result);
		}
		});		
});*/


router.post('/',(req,res)=>{
	var newUser=new userDetail();
	newUser.name=req.body.name;
	newUser.email=req.body.email;
	newUser.password=req.body.password;
	newUser.gender=req.body.gender;
	newUser.age=req.body.age;
	newUser.save((err,result)=>{
		if(err)
			console.log('Error in saving');
		else{
			console.log(result);
			res.send(result);
		}
		});		
});
module.exports = router;