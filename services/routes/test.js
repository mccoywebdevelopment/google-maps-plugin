var express = require("express");
var request = require("request");
var router  = express.Router();
var userModel = require("../../models/user");
var locationsModel=require("../../models/locations");
var sessionDataModel=require("../../models/sessionData");
const mongoose=require('mongoose');
var isLoggedIn=require('../middleWare/isLoggedIn');
var obfuscator=require('../middleWare/obfuscatorCode');
var getData=require('../middleWare/getData');
var createData=require('../middleWare/create');
var Location=createData.Location;
var fs = require("fs");


/*router.get('/test2',function(req,res){
	var user=req.user;
	var session=req.session;
	var location1=new Location("test1","338 E Harvard",null,"480-703-1806",1,{lat:305,lng:23});
	var location2=new Location("test2","338 E Harvard",null,"480-703-1806",2,{lat:305,lng:23});
	var objects=[];
	objects.push(location1);
	objects.push(location2);
	createData.saveToDatabaseWithObject(req,user,session,objects,sessionDataModel,userModel,function(x){
		res.send(x);
		deleteByPlaceId(req,user,session,userModel,sessionDataModel,1,function(data){
			console.log(data);
			getData.getLocations(req,user,session,userModel,sessionDataModel,function(data){
				console.log("final data:")
				console.log(data);

			});
		});
		
	});
});*/

function deleteByPlaceId(req,user,session,userModel,sessionDataModel,placeId,callback)
{
	if(user!=null)
	{
		deleteByUserPlaceId(req.user.id,userModel,placeId,function(data){
			callback(data);
		});
	}
	else{

		deleteBySessionPlaceId(req.session.id,sessionDataModel,placeId,function(data){
			callback(data);
		});
	}
}
function deleteByUserPlaceId(id,userModel,placeId,callback){
	UserModel.deleteOne({postedBy:id},function(err,data){
		if(err)
		{
			console.log(err);
			callback(null);
		}
		else{
			var match=false;
			var newData=null;
			for(var i=0;i<data[0].locations.length;++i)
			{
				if(data[0].locations[i].placeId==placeId)
				{
					match=true;
					console.log("Found match by placeId");
					newData=data[0].locations[i];
				}
			}
			if(match==false)
			{
				console.log("No matches for placeId:"+placeId);
			}
			callback(newData);
		}
	});
}
function deleteBySessionPlaceId(id,sessionModel,selectedPlace,callback){
	sessionModel.update(
    {postedBy:id},
    { $pull: {locations:{placeId:selectedPlace}}},function(err,data){
    	if(err)
    	{
    		console.log(err);
    		callback(null);
    	}
    	else{
    		console.log(data);
    		callback(true);
    	}
    }
	);

	/*sessionModel.find({postedBy:id},function(err,data){
		if(err)
		{
			console.log(err);
			callback(null);
		}
		else{
			var match=false;
			var newData=null;
			for(var i=0;i<data[0].locations.length;++i)
			{
				if(data[0].locations[i].placeId==placeId)
				{
					match=true;
					console.log("Found match by placeId");
					newData=data[0].locations[i];
					console.log("newData:");
					console.log(newData);
					delete newData;
				}
			}
			if(match==false)
			{
				console.log("No matches for placeId:"+placeId);
			}
			sessionModel.save(data);
			callback(data);
		}
	});*/

}





module.exports = router;