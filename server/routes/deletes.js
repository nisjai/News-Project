var express=require('express');
let router = express.Router();
var Details =require('../model/Schema');

router.delete('/:id',(req,res)=>{
	Details.findOneAndRemove({
		_id:req.params.id
	},(err,result)=>{
		if(err)
			console.log('Error in deleting');
		else{
			//res.send(result);
			console.log('deleted successfully');
		}
		
	})
});
module.exports = router;