const mongoose=require('mongoose');


const Schema=mongoose.Schema;

var locationSchema =new mongoose.Schema({
	companyName:String,
	address:String,
	position:{
		lat:Number,
		lng:Number
	},
	link:String,
	state:String,
	city:String,
	phoneNumber:Number,
	postedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
});

var location =mongoose.model("location",locationSchema);

module.exports=location;