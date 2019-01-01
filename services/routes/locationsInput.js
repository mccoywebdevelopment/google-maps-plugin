var express = require("express");
var request = require("request");
var router  = express.Router();
var userModel = require("../../models/user");
var locationsModel=require("../../models/locations");
const mongoose=require('mongoose');

var _key="AIzaSyCJyl_DjWAyQrgaRq_xAQjhPb22zUoi_xw";

function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
}

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
	var objects=[];

	console.log(req.user._id);


	var address2=checkAddress(address);
	update(address2,link,city,name,number,state,objects);


	
	function update(address2,link,city,name,number,state,objects)
	{
		var url=[];
		for(i=0;i<address2.length;++i)
		{
			var urll = "https://maps.googleapis.com"+
				"/maps/api/geocode/json?address="+address[i]+" "+city[i]+" "+state[i]+"&key="+_key;
			url.push(urll);
		}
		var itemsProcessed = 0;
		url.forEach(function(item,i,array){
			request({url: item,json: true}, function (error, response, body) {
			    if (!error && response.statusCode === 200) {
			       if(body.status=="OK")
			       {
			       		location=body.results[0].geometry.location;
			       		objects.push({location:location,address:address2[i]});
			       }
			       else{
			       	console.log(body.status);
			       	objects.push({location:{lat:0,lng:0}},address2[i]);
			       }
			    }
			    else if(error)
			    {
			    	console.log(error);
			    }
			    itemsProcessed++;
			    if(itemsProcessed === array.length)
			    {
			    	callback(objects);
			    }
			});
		});
	}
	function callback (objects) 
	{ 
		for(var i=0;i<objects.length;++i)
		{
			var locations=new locationsModel({
					companyName:name[i],
					address:objects[i].address,
					position:objects[i].location,
					link:link[i],
					state:state[i],
					city:city[i],
					phoneNumber:number[i],
					postedBy: req.user.id

			});
			locations.save(function(err,user){
					if(err)
					{
						console.log(err);
					}else{
						console.log("user");
						console.log(user);
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