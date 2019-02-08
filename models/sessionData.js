const mongoose=require('mongoose');

const Schema=mongoose.Schema;

var sessionDataSchema =new mongoose.Schema({
	locations: [{
		_id:false,
		title:String,
		address:String,
		link:String,
		phoneNumber:String,
		placeId:Number,
		uniqueId:String,
		position:{
			lat:Number,
			lng:Number
		},
	}],
	styles:{
		isBlack:Boolean
	},
	mapName:String,
	postedBy:String,

});
var sessionData =mongoose.model("sessionData",sessionDataSchema);

module.exports=sessionData;