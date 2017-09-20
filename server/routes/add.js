let express = require('express');
let router = express.Router();
var Details =require('../model/Schema');

router.post('/',(req,res)=>{
	Details.findOne({url:req.body.url},(err,result)=>{
		if(err){
			console.log("Error occured");
		}
		else{
			if(result)
			{
				res.sendStatus(404);
			}
			else{
				console.log("News not found");
				var fresheNews=new Details();

				fresheNews.title = req.body.title;
				fresheNews.description = req.body.description;
				fresheNews.urlToImage = req.body.urlToImage;
				fresheNews.publishedAt = req.body.publishedAt;
				fresheNews.url = req.body.url;
				fresheNews.save((err,data)=>
				{
					if(err){
						res.send(data);
					}
					else
					{
						res.send(data);
					}
				});
			}}});
});
module.exports = router;