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

var _key="AIzaSyCJyl_DjWAyQrgaRq_xAQjhPb22zUoi_xw";

/*default client data*/



router.get('/locationsInput',function (req,res) {

	fs.readFile(__dirname +"/../documents/blankMap.js", function (err, data) {
	    if (err) throw err;
	    data=obfuscator.obfuscateCode(data);
	    var myKey="https://maps.googleapis.com/maps/api/js?key="+_key+"&libraries=places&callback=initMap";
	    res.render('locationInput.ejs',{mapJs:data,gKey:myKey});
	});
});




router.post('/main',function(req,res){
	var address=req.body.address;
	var link=req.body.link;
	var name=req.body.title;
	var number=req.body.phoneNumber;
	var urll = "https://maps.googleapis.com"+"/maps/api/geocode/json?address="+address+"&key="+_key;
	request({url: urll,json: true}, function (error, response, body) {
		if (!error && response.statusCode === 200) 
		{
			if(body.status=="OK")
			{
				var location=body.results[0].geometry.location;
			}
			else{
				//No location found!!!!
				 var location={lat:0,lng:0};
			}
			updateDataBase(location,address,link,name,number,null,req);

		}
		else if(error)
		{
			console.log(error);
		}
	});
});

function updateDataBase(position,address,link,name,number,placeId,req)
{
	if(req.user!=null)
	{
		var location=new locationsModel({
			title:name,
			address:address,
			link:link,
			phoneNumber:number,
			placeId:placeId,
			position:position,
			postedBy: req.user.id

		});
		location.save(function(err,user){
			if(err)
			{
				console.log(err);
			}
			else{
				console.log(user);
			}
		});
	}
	else{
		var location=new sessionDataModel({
			title:name,
			address:address,
			link:link,
			phoneNumber:number,
			placeId:placeId,
			position:position,
			postedBy: req.session.id
		});
		location.save(function(err,user){
			if(err)
			{
				console.log(err);
			}
			else{
				console.log(user);
			}
		});
	}
}
module.exports = router;
