const mongoose=require('mongoose');

const Schema=mongoose.Schema;

var sessionDataSchema =new mongoose.Schema({
	title:String,
	address:String,
	link:String,
	phoneNumber:Number,
	placeId:Number,
	position:{
		lat:Number,
		lng:Number
	},
	postedBy: {
		sessionId:String
	},
});

var sessionData =mongoose.model("sessionData",sessionDataSchema);

module.exports=sessionData;