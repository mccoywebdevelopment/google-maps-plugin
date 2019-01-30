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
var getData=require("../middleWare/getData");
var fs = require("fs");
var passport = require("passport");
var crypto = require("crypto");

//Submit form on redirect to url!!!!!!

router.get('/loginOrRegister/:errorId',function (req,res) {
	var errorId=req.params.errorId;
	var errorCode=null;
	if(errorId==201)
	{
		errorCode="Wrong username or email."
	}
	if(req.isAuthenticated())
	{
		console.log(errorId);
		res.redirect('/getCode');
	}
	else{
		console.log(errorId);
		res.render('loginOrRegister.ejs',{errorCode,errorCode});
	}
});



router.post('/loginOrRegister/login', 
  passport.authenticate('local', { failureRedirect: '/loginOrRegister/201' }),
  function(req, res) {
  	//add session data to user
    res.redirect('/getCode');
});


router.post("/loginOrRegister/register", function(req, res){
    var newUser = new userModel({username: req.body.username});
    userModel.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.redirect("/loginOrRegister/201");
        }
        passport.authenticate("local")(req, res, function(){
        	//create user then add session data to user
        	console.log("UserId:"+req.user.id);
        	getData.findSessionDataById(sessionDataModel,req.session.id,function(data){
        		//transfer data session to user locations
        		var locations=[];
        		for(var i=0;i<data.length;++i)
        		{
        			var location={
        				title:data[i].title,
						address:data[i].address,
						link:data[i].link,
						phoneNumber:data[i].phoneNumber,
						placeId:data[i].placeId,
						uniqueId:data[i].uniqueId,
						position:data[i].position
        			};
        			locations.push(location);
        		}
        		const idKey = crypto.randomBytes(8).toString("hex");
        		var newUserLocation=new locationsModel({
        			locations:locations,
        			dataKey:idKey,
        			postedBy:req.user.id

        		});
        		newUserLocation.save(function(err,data){
					if(err)
					{
						console.log(err);
						callback(null);
					}
					else{
						console.log("sucessfully saved newUserLocation");
					}
				});

        	});

           res.redirect("/getCode"); 
        });
    });
});

router.get("/getCode",isLoggedIn,function(req,res){
	var user=req.user.id;
	var session=req.session.id;
	locationsModel.find({postedBy:user},function(err,data){
		if(err)
		{
			console.log(err);
			callback(null);
		}
		else{
			console.log(data);
			var code = "<div id='map'></div>"+
					"<script src='http://localhost:3000/userData/"+data[0].dataKey+"'></script>";
			res.render("getCode.ejs",{html:code});

		}
	});
		
});


router.get("/userData/:requestId",function(req,res){ //get locations goes here
	var requestId=req.params.requestId;
	var code="var map=document.getElementById('map');"+
	"map.innerHTML='test';"+
	"alert(window.location.href)";
	locationsModel.find({dataKey:requestId}, function (err, docs) {
        if (!docs.length){
            code="var map=document.getElementById('map');"+
					"map.innerHTML='You do not have access to view this';"+
					"alert(window.location.href)"
        }
         res.render("userData.ejs",{code:code});
    });
	
	
});

router.post("/callback",function(req,res){

	var user=req.body.url

});
module.exports = router;