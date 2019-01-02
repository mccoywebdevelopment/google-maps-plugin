var express = require("express");
var router  = express.Router();
var userModel = require("../../models/user");
var locationsModel=require("../../models/locations");
const mongoose=require('mongoose');
var isLoggedIn=require('../middleWare/isLoggedIn');

router.get('/viewMap',isLoggedIn,function(req,res){
	locationsModel.find({postedBy:req.user._id},function(err,locations){
		if(err)
		{
			console.log(err);
		}
		else{
			var data=[];
			var messages=[];
      console.log("Locations length(map):"+locations.length);
			for(var i=0;i<locations.length;++i)
			{
				if(locations[i].position.lat==0 && locations[i].position.lng==0)
				{
          var msg="This address: "+locations[i].address+" you entered was incorrect.";
          messages.push(msg);
				}
				else{
					data.push({position:locations[i].position,name:locations[i].companyName,address:locations[i].address+" "+locations[i].city+" "+locations[i].state});
				}
			}
      console.log("MAP");
      console.log(locations);
      console.log("END MAP");
			res.render('viewMap.ejs',{locations:data,errorMessages:messages});
		}
	});
});

module.exports = router;