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


router.get('/test2',function(req,res){
	var user=req.user;
	var session=req.session;
	var location1=new Location("test1","338 E Harvard",null,"480-703-1806",4,{lat:305,lng:23});
	var location2=new Location("test2","338 E Harvard",null,"480-703-1806",4,{lat:305,lng:23});
	var objects=[];
	objects.push(location1);
	objects.push(location2);
	createData.saveToDatabaseWithObject(req,user,session,objects,sessionDataModel,userModel,function(x){
		res.send(x);
		getData.getLocations(req,user,session,userModel,sessionDataModel,function(data){
			console.log(data);
		});
	});
});





module.exports = router;