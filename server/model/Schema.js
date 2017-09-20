var mongoose =require('mongoose');
//let mongoose=require('mongoose');
let Schema=mongoose.Schema;
let DetailSchema=new Schema({
	title: String,
	description:String,
	urlToImage:String,
	publishedAt:String,
	url:String
});

module.exports=mongoose.model('newsDetail',DetailSchema);