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

//NOTES: need to render then rerender the page once the database gets the code.
/*
1. submit location
2. save to database
3. get all locations from that users
4. render a script with all of the data
5. add script to blank map.js
6. obfusicate
*/

/*default client data*/

function ClientLocation(title,address,link,phoneNumber,place,position){
		this.title=title;
		this.address=address;
		this.link=link;
		this.phoneNumber=phoneNumber;
		this.placeId=place;
		this.position=position;

		this.getAddress=function(){
			return this.address;
		}

};

router.get('/locationsInput',function (req,res) {

	fs.readFile(__dirname +"/../documents/blankMap.js", function (err, data) {//render the page and once i get the the data back then update the page!!!!!!!!!
	    if (err) throw err;
	   	var newData=obfuscator.obfuscateCode(data);
	    var myKey="https://maps.googleapis.com/maps/api/js?key="+_key+"&libraries=places&callback=initMap";
	    res.render('locationInput.ejs',{mapJs:newData,gKey:myKey});
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
			updateDataBase(location,address,link,name,number,null,req,res);

		}
		else if(error)
		{
			console.log(error);
		}
	});
});

function updateDataBase(position,address,link,name,number,placeId,req,res)
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
				//res.redirect('/locationsInput');
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
			postedId: req.session.id
		});
		location.save(function(err,user){
			if(err)
			{
				console.log(err);
			}
			else{
				//res.redirect('/locationsInput');
				updateJSFile(req,res);
			}
		});
	}
	console.log("after updateDataBase");
}
/*function getData(req)
{
	var data=null;
	if(req.user!=null)
	{
		locationsModel.find({postedBy:req.user._id},function(err,locations){
			if(err)
			{
				console.log(err);
			}
			else{
				console.log("found login user model.");
				data=locations;
				return data;
			}
		});
	}
	else{
		sessionDataModel.find({postedId:req.session.id},function(err,locations){
			if(err)
			{
				console.log(err);
			}
			else{
				console.log("found session model.");
				console.log(locations[0]);
				console.log("End found session model.");
				return locations[0]
			}
		});
	}
}*/

function updateJSFile(req,res)
{
	var clientData=[];
	var data=null;
	if(req.user!=null)
	{
		locationsModel.find({postedBy:req.user._id},function(err,locations){
			if(err)
			{
				console.log(err);
			}
			else{
				console.log("found login user model.");
			}
		});
	}
	else{
		sessionDataModel.find({postedId:req.session.id},function(err,locations){
			if(err)
			{
				console.log(err);
			}
			else{
				for(var i=0;i<locations.length;++i)
				{
					/*
					function ClientLocation(title,address,link,phoneNumber,place,position){
							this.title=title;
							this.address=address;
							this.link=link;
							this.phoneNumber=phoneNumber;
							this.placeId=place;
							this.position=position;

							this.getAddress=function(){
								return this.address;
							}

					};

					*/
					//var newLocation=new ClientLocation(locations[i].title,locations[i].address,locations[i].phoneNumber,locations[i].placeId,locations[i].placeId,locations[i].position);
					var newLocation=new ClientLocation(locations[i].title,locations[i].address,null,null,null,locations[i].position);

					clientData.push(newLocation);
				}
				var beforeData="var clientPositions="+JSON.stringify(clientData)+";\n"
				fs.readFile(__dirname +"/../documents/blankMap.js", function (err, data) {//render the page and once i get the the data back then update the page!!!!!!!!!
				    if (err) throw err;
				    var str=beforeData+data;
				    console.log(str);
				    var newData=beforeData+obfuscator.obfuscateCode(data);
				    var myKey="https://maps.googleapis.com/maps/api/js?key="+_key+"&libraries=places&callback=initMap";
				    res.render('locationInput.ejs',{mapJs:newData,gKey:myKey});
				});

				/*fs.writeFile(_dirname +"/../../public/userJS/"+"test",data,function (err) {
					if(err)
					{
						console.log(err);
					}
					fs.readFile(__dirname +"/../documents/blankMap.js", function (err, data) {//render the page and once i get the the data back then update the page!!!!!!!!!
					    if (err) throw err;
					    var newData;
					    var myKey="https://maps.googleapis.com/maps/api/js?key="+_key+"&libraries=places&callback=initMap";
					    res.render('locationInput.ejs',{mapJs:newData,gKey:myKey});
					});
				});*/

			}
		});
	}
}
module.exports = router;
