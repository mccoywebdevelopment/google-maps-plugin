var express = require("express");
var router  = express.Router();
var userModel = require("../../models/user");
var locationsModel=require("../../models/locations");
const mongoose=require('mongoose');
var isLoggedIn=require('../middleWare/isLoggedIn');
var editUserJsFile=require('../middleWare/editUserJsFile');
var uuid = require('uuid');
var fs = require('fs');

router.get('/viewMap',function(req,res){
	if(req.user!=null)
	{
		locationsModel.find({postedBy:req.user._id},function(err,locations){
			if(err)
			{
				console.log(err);
			}
			else{
				var data=[];
				var messages=[];
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
	      		createUserJsFIle(101,data);
				res.render('viewMap.ejs',{locations:data,errorMessages:messages});
			}
		});
	}
	else{
		
	}
	
});

function createUserJsFIle(userId,userData)
{

	var writeStream = fs.createWriteStream(__dirname + "/../../public/usersJS/"+userId+".js");

	writeStream.write("var clientPositions=");
	writeStream.write(JSON.stringify(userData));
	writeStream.write(";");
	writeStream.end();
}

module.exports = router;