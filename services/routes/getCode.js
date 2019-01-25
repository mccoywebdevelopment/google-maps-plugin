var express = require("express");
var request = require("request");
var router  = express.Router();
var user = require("../../models/user");
var locationsModel=require("../../models/locations");
var sessionDataModel=require("../../models/sessionData");
const mongoose=require('mongoose');
var isLoggedIn=require('../middleWare/isLoggedIn');
var obfuscator=require('../middleWare/obfuscatorCode');
var createModule=require('../middleWare/create');
var getData=require("../middleWare/getData");
var fs = require("fs");
var passport = require("passport");

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

router.post('/loginOrRegister/login',passport.authenticate('local',function(err){
	if(err)
	{
		console.log(err);
	}
} ,{ failureRedirect: '/loginOrRegister/201',successRedirect:'/getCode', }));

/*router.post('/loginOrRegister/register', passport.authenticate('local', { failureRedirect: '/loginOrRegister/201' }),function(req, res){
	res.redirect('/getCode');
});*/
router.post("/loginOrRegister/register", function(req, res){
    var newUser = new user({username: req.body.username});
    user.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.redirect("/loginOrRegister/201");
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/getCode"); 
        });
    });
});

router.get("/getCode",isLoggedIn,function(req,res){
	res.send("success");
	/*var user=req.user.id;
	user=null;//Get data from session later we will transfer the data.
	var session=req.session.id;
	getData.getLocations(req,user,session,userModel,sessionDataModel,function(data){
		console.log(data);
		var code = "\n<div class='col-lg-8 padding-left-60 padding-right-60 padding-top-60 probootstrap-animate fadeInRight probootstrap-animated'>\n"+
				   "\t<div class='col-lg-12 col-sm-12 col-sm-12 no-pad-rt'>\n"+
				   "\t\t<div id='map' style='background-color: white;'>\n"+
				   "\t\t</div>\n"+
				   "\t</div>\n"+
				   "</div>\n"+
				   "<script type='text/javascript' src='http://localhost:3000/JS/basicMap.js'></script>\n"+
				   "<script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyCJyl_DjWAyQrgaRq_xAQjhPb22zUoi_xw&libraries=places&callback=initMap' async defer></script>\n";


				   ;
		res.render("getCode.ejs",{html:code});
		//res.send(data);
	});*/
});
module.exports = router;