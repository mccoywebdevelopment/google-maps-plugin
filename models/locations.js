const mongoose=require('mongoose');

const Schema=mongoose.Schema;

var locationSchema =new mongoose.Schema({
	locations:[
		{_id:false,
			title:String,
		address:String,
		link:String,
		phoneNumber:Number,
		placeId:Number,
		uniqueId:String,
		position:{
			lat:Number,
			lng:Number
		}
	}],
	styles:{
		isBlack:Boolean
	},
	dataKey:String,
	postedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
});

var Location =mongoose.model("userLocations",locationSchema);


module.exports=Location;