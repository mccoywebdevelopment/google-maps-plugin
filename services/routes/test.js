var express = require("express");
var request = require("request");
var router  = express.Router();
var userModel = require("../../models/user");
var locationsModel=require("../../models/locations");
var sessionDataModel=require("../../models/sessionData");
const mongoose=require('mongoose');
var isLoggedIn=require('../middleWare/isLoggedIn');
var obfuscator=require('../middleWare/obfuscatorCode');
var getData=require('../middleWare/getData');
var createData=require('../middleWare/create');
var Location=createData.Location;
var fs = require("fs");


router.get('/test2',function(req,res){
	res.render('userDashboard.ejs');
});





module.exports = router;