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
var fs = require("fs");

router.get('/loginOrRegister',function (req,res) {
	if(req.isAuthenticated())
	{
		console.log("isLoggedIn");
		res.redirect('/getCode');
	}
	else{
		console.log("Nope");
		res.send("register or login");
	}
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
	res.send("You get code!!!");
});
module.exports = router;