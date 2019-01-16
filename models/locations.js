const mongoose=require('mongoose');

const Schema=mongoose.Schema;

var locationSchema =new mongoose.Schema({
	locations:[
		{title:String,
		address:String,
		link:String,
		phoneNumber:Number,
		placeId:Number,
		position:{
			lat:Number,
			lng:Number
		}
	}],
	postedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
});

var Location =mongoose.model("userLocations",locationSchema);


module.exports=Location;