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
  passport.authenticate('local', { failureRedirect: '/loginOrRegister/201' }),//add :errorId so that i can show the id
  function(req, res) {
    res.redirect('/getCode');
});
/*router.get('/loginOrRegister/register',function(req,res){
	// show register form
});

router.post('/loginOrRegister/register',function(req,res){
	// get register infomation
	// transfer data from session to User
	// delete session data
	// if registered redirect to getCode
});

router.get('/loginOrRegistere/login',function(req,res){
	// show register form
});

router.post('/loginOrRegister/login',function(req,res){
	// get register infomation
	// transfer data from session to User
	// delete session data
	// if registered redirect to getCode
});
*/
router.get("/getCode",isLoggedIn,function(req,res){
	var user=req.user.id;
	user=null;
	var session=req.session.id;
	getData.getLocations(req,user,session,userModel,sessionDataModel,function(data){
		console.log(data);
		res.send(data);
	});
});
module.exports = router;