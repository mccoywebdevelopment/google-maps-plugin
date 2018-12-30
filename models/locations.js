const mongoose=require('mongoose');


const Schema=mongoose.Schema;

var locationSchema =new mongoose.Schema({
	address:String,
	position:{
		lat:Number,
		lng:Number
	},
	links:[String]
});

var location =mongoose.model("location",locationSchema);

module.exports=location;