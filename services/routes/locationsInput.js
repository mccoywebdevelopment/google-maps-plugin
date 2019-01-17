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
var fs = require("fs");

var _key="AIzaSyCJyl_DjWAyQrgaRq_xAQjhPb22zUoi_xw";



router.get('/locationsInput',function (req,res) {
	    var myKey="https://maps.googleapis.com/maps/api/js?key="+_key+"&libraries=places&callback=initMap";
	    res.render('locationInput.ejs',{gKey:myKey});
});


router.post('/main',function(req,res){
	var address=req.body.address;
	var link=req.body.link;
	var name=req.body.title;
	var number=req.body.phoneNumber;
	
});


module.exports = router;
