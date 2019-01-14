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


/*router.get('/locationsInput/editLocation',function(req,res){
	//res.render("locationInputEditLocation.ejs",{mapJs:data,gKey:myKey});
	fs.readFile(__dirname +"/../documents/blankMap.js", function (err, data) {
	    if (err) throw err;
	    data=obfuscator.obfuscateCode(data);
	    var myKey="https://maps.googleapis.com/maps/api/js?key="+_key+"&libraries=places&callback=initMap";
	    res.render("locationInputEditLocation.ejs",{mapJs:data,gKey:myKey});
	});
});*/







router.post('/main',function(req,res){

	var address=req.body.address;
	var link=req.body.link;
	var city=req.body.city;
	var name=req.body.companyName;
	var number=req.body.phone;
	var state=req.body.state;
	var isDone=false;

	var objects=[];

	var address2=checkAddress(address);

	isDone=true;
	if(isDone)
	{
		update(address2,link,city,name,number,state,objects);
		isDone=false;
	}
	
	function update(address2,link,city,name,number,state,objects)
	{
		var url=[];
		console.log("address2Len"+address2.length)
		for(i=0;i<address2.length;++i)
		{
			var urll = "https://maps.googleapis.com"+
				"/maps/api/geocode/json?address="+address[i]+" "+city[i]+" "+state[i]+"&key="+_key;
			url.push(urll);
		}
		var itemsProcessed = 0;
		url.forEach(function(item,i,array){
			request({url: item,json: true}, function (error, response, body) {
	
				itemsProcessed++;

				if (!error && response.statusCode === 200) 
				{
					if(body.status=="OK")
					{
						location=body.results[0].geometry.location;
						objects.push({location:location,address:address2[i]});
					}
					else{
						objects.push({location:{lat:0,lng:0},address:address2[i]});
					}
				}
				else if(error)
				{
					console.log(error);
				}
			    if(itemsProcessed === array.length)
			    {
			    	callback(objects);
			    }

			});
		});
	}
	function callback (objects2)
	{ 
		var userId=null;
		var locations=[];
		if(req.user!=null)
		{
			userId=req.user.id;
		}
		else{
			userId=req.session.id;
		}
					
		for(var i=0;i<objects2.length;++i)
		{
			if(req.user!=null)
			{
				var location=new locationsModel({
					companyName:name[i],
					address:objects2[i].address,
					position:objects2[i].location,
					link:link[i],
					state:state[i],
					city:city[i],
					phoneNumber:number[i],
					postedBy: req.user.id

				});
			}
			else{
				
				var location=new sessionDataModel({
					companyName:name[i],
					address:objects2[i].address,
					position:objects2[i].location,
					link:link[i],
					state:state[i],
					city:city[i],
					phoneNumber:number[i],
					postedBy: req.session.id
				});
			}
			locations.push(location)
		}
		objects=[];
		for(var i=0;i<locations.length;++i)
		{
			locations[i].save(function(err,user){
				if(err)
				{
					console.log(err);
				}
			});
		}
		res.redirect('/viewMap');


	}	
		

});


function checkAddress(address)
{
	var array=[];
	for(var i=0;i<address.length;++i)
	{
		if(address[i]!="")
		{
			array.push(address[i]);
		}
	}
	return array;
}

module.exports = router;
