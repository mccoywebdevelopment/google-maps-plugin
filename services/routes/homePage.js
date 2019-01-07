var express = require("express");
var router  = express.Router();

router.get("/",function(req,res){
	res.render("homePage.ejs");
});

router.get("/test",function(req,res){
	res.render("mapsPreview.ejs");
});

module.exports = router;