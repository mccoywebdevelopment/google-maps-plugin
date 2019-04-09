var express = require("express");
var isLoggedIn=require('../middleWare/isLoggedIn');
var check=require('../middleWare/isUserLoggedOn');
var router  = express.Router();

router.get("/",function(req,res){
	res.render("homePage.ejs",{isLoggedIn:check.isUserLoggedOn(req,res)});
});

router.get("/test",function(req,res){
	res.render("mapsPreview.ejs");
});

module.exports = router;