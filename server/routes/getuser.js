let express =require('express');
let router = express.Router();
let userDetail =require('../model/User');

router.post('/',(req,res)=>{
	userDetail.find({email:req.body.email,password:req.body.password})
	.exec((err,result)=>{
		if(err)
			console.log('Error occured');
		else
			res.json(result);
	});
})

module.exports = router;