var express = require("express");
var request = require("request");
var router  = express.Router();
var userModel = require("../../models/user");
var locationsModel=require("../../models/locations");
var sessionDataModel=require("../../models/sessionData");
const mongoose=require('mongoose');
var isLoggedIn=require('../middleWare/isLoggedIn');
var obfuscator=require('../middleWare/obfuscatorCode');
var fs = require("fs");


router.get('/test2',function(req,res){
	var user=req.user;
	var session=req.session;
	var location1=new Location("test1","338 E Harvard",null,"480-703-1806",4,{lat:305,lng:23});
	var location2=new Location("test2","338 E Harvard",null,"480-703-1806",4,{lat:305,lng:23});
	var objects=[];
	objects.push(location1);
	objects.push(location2);
	saveToDatabaseWithObject(req,user,session,objects,sessionDataModel,userModel,function(x){
		res.send(x);
	});
});
function saveToDatabaseWithObject(req,user,session,locations,sessionDataModel,userModel,callback)
{
	if(user!=null)
	{
		createUserLocation(req.user.id,userModel,locations,function(data){
			callback(data);
		});
	}
	else{
		createSessionLocation(req.session.id,sessionDataModel,locations,function(data){
			callback(data);
		});
	}
}
function createUserLocation(id,userModel,objects,callback){

	var locations=[];
	for(var i=0;i<objects.length;++i){
		var newLocation={
		title:objects[i].title,
		address:objects[i].address,
		link:objects[i].link,
		phoneNumber:objects[i].phoneNumber,
		placeId:objects[i].placeId,
		position:objects[i].position
		};
		locations.push(newLocation);
	}

	var location=new userModel({
		locations:locations,
		postedBy:id
	});

	location.save(function(err,data){
		if(err)
		{
			console.log(err);
			callback(null);
		}
		else{
			console.log("Successfully saved user data:");
			console.log(data);
			callback(data);
		}
	});

}
function createSessionLocation(id,sessionModel,objects,callback){
		var locations=[];
		for(var i=0;i<objects.length;++i){
			var newLocation={
				title:objects[i].title,
				address:objects[i].address,
				link:objects[i].link,
				phoneNumber:objects[i].phoneNumber,
				placeId:objects[i].placeId,
				position:objects[i].position
			};
			locations.push(newLocation);
		}

		var location=new sessionModel({
		locations:locations,
		postedBy:id
		});

		location.save(function(err,data){
			if(err)
			{
				console.log(err);
				callback(null);
			}
			else{
				console.log("Successfully saved session data:");
				console.log(data);
				callback(data);
			}
		});
}
function Location(title,address,link,phoneNumber,place,position){
		this.title=title;
		this.address=address;
		this.link=link;
		this.phoneNumber=phoneNumber;
		this.placeId=place;
		this.position=position;
};




module.exports = router;