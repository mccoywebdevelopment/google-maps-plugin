const mongoose=require('mongoose');

const Schema=mongoose.Schema;

var sessionDataSchema =new mongoose.Schema({
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
		sessionId:String
	},
});

var sessionData =mongoose.model("sessionData",sessionDataSchema);

module.exports=sessionData;