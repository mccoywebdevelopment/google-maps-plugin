var express = require("express");
var router  = express.Router();
var userModel = require("../../models/user");
var locationsModel=require("../../models/locations");
const mongoose=require('mongoose');

router.get('/viewMap',function(req,res){
	locationsModel.find({},function(err,locations){
		if(err)
		{
			console.log(err);
		}
		else{
			var data=[];
			for(var i=0;i<locations.length;++i)
			{
				data.push(locations[i].position);
			}
			res.render('viewMap.ejs',{locations:data});
		}
	});
});

module.exports = router;