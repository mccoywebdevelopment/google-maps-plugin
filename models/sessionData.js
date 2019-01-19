const mongoose=require('mongoose');

const Schema=mongoose.Schema;

var sessionDataSchema =new mongoose.Schema({
	locations: [{
		title:String,
		address:String,
		link:String,
		phoneNumber:String,
		placeId:Number,
		uniqueId:String,
		position:{
			lat:Number,
			lng:Number
		}
	}],
	postedBy:String,

});
var sessionData =mongoose.model("sessionData",sessionDataSchema);

module.exports=sessionData;