var express =require('express');
let router = express.Router();
var Details=require('../model/Schema');

router.put('/:id',(req,res)=>{
	console.log(req.body.comment);
	Details.update({
		_id:req.params.id
	},
	{$addToSet:{comment:req.body.comment}},{strict:false},
	(err,result)=>{
		if(err){
			console.log(err);
		}
		else{
			console.log(result);
			res.json(result);
			//res.send(result)
			//res.send(err);
			//res.status(204);
		}
	}
	);
});

module.exports = router