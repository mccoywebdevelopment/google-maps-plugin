var express = require("express");
var request = require("request");
var router  = express.Router();
var userModel = require("../../models/user");
var locationsModel=require("../../models/locations");
var sessionDataModel=require("../../models/sessionData");
const mongoose=require('mongoose');
var isLoggedIn=require('../middleWare/isLoggedIn');
var obfuscator=require('../middleWare/obfuscatorCode');
var createModule=require('../middleWare/create');
var getData=require('../middleWare/getData');
var create=require('../middleWare/create');
var fs = require("fs");
var getFiles=require('../middleWare/editUserJsFile');
var crypto = require("crypto");
var check=require('../middleWare/isUserLoggedOn');

var _key="AIzaSyCJyl_DjWAyQrgaRq_xAQjhPb22zUoi_xw";

router.get('/locationsInput',function (req,res) {
	var myKey="https://maps.googleapis.com/maps/api/js?key="+_key+"&libraries=places&callback=initMap";
	res.render('locationInput.ejs',{gKey:myKey,mkey:_key,isLoggedIn:check.isUserLoggedOn(req,res)});
});

router.post('/getData',function(req,res){
	var data=req.body.data;
	var styles=req.body.styles;
	var mapName=req.body.mapName;
	console.log("mapName");
	console.log(mapName);
	styles=JSON.parse(styles);
	data=JSON.parse(data);
	console.log("data====================================================");
	console.log(data);
	console.log("data====================================================");
	const id = crypto.randomBytes(8).toString("hex");
	create.saveToDatabaseWithObject(req,data,styles,mapName,sessionDataModel,locationsModel,id,function(x){
		console.log("Save to Database=========================================================");
		console.log(x);
	});
	
	res.redirect("/loginOrRegister/0");
});


module.exports = router;
