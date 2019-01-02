var express = require("express");
var request = require("request");
var router  = express.Router();
var userModel = require("../../models/user");
var locationsModel=require("../../models/locations");
const mongoose=require('mongoose');
var isLoggedIn=require('../middleWare/isLoggedIn');

var _key="AIzaSyCJyl_DjWAyQrgaRq_xAQjhPb22zUoi_xw";

router.get('/locationsInput',isLoggedIn,function (req,res) {
  res.render('locationInput.ejs');
});


router.post('/main',isLoggedIn,function(req,res){

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


				 //objects.push({location:{lat:0,lng:0},address:address2[i]});
			    if(itemsProcessed === array.length)
			    {
			    	callback(objects);
			    }


			    /*
			    if (!error && response.statusCode === 200) 
			    {
			       if(body.status=="OK")
			       {
			       		location=body.results[0].geometry.location;
			       		objects.push({location:location,address:address2[i]});
			       }
			       else{
			       	objects.push({location:{lat:0,lng:0}},address2[i]);
			       }
			    }
			    else if(error)
			    {
			    	console.log(error);
			    }*/
			});
		});
	}
	function callback (objects2) /* fix all of this !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
	{ 
		var locations=[];
		for(var i=0;i<objects2.length;++i)
		{
			var location=new locationsModel({
					companyName:name[i],
					address:objects2[i].address,   //this is wrong....
					position:objects2[i].location,
					link:link[i],
					state:state[i],
					city:city[i],
					phoneNumber:number[i],
					postedBy: req.user.id

			});
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