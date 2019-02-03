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

//Make sure this key is correct & if changed update all users with valid parameters
var _key="AIzaSyCJyl_DjWAyQrgaRq_xAQjhPb22zUoi_xw";

router.get('/loginOrRegister/:errorId',function (req,res) {
	var errorId=req.params.errorId;
	var errorCode=null;
	if(errorId==201)
	{
		errorCode="Wrong username or email."
	}
	if(req.isAuthenticated())
	{
		//created another one get user data id
		console.log(errorId);
		res.redirect('/getCode');
		console.log("got in");
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
    var password=req.body.password;
    registerUser(req,res,userModel,sessionDataModel,locationsModel,crypto,passport,newUser,password,function(x){
    	if(x==null)
    	{
    		console.log(error);
    	}
    	else{
    		res.redirect(x);
    	}
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
			if(!process.env.PORT || !process.env.MONGODB_URI.toString())
			{
				var code = "\n<iframe style='width:800px;height: 400px;' src='http://localhost:3000/userData/"+data[0].dataKey+"'>"+
						   "\n</iframe>";
			}
			else{
				var code = "\n<iframe style='width:800px;height: 400px;' src='https://gmapsmccoy.herokuapp.com/userData/"+data[0].dataKey+"'>"+
						   "\n</iframe>";					
			}
			res.render("getCode.ejs",{html:code});
	
		}
	});
		
});


router.get("/userData/:requestId",function(req,res){ //get locations goes here
	var requestId=req.params.requestId;
	var code="var map=document.getElementById('map');"+
			"map.innerHTML='You do not have access to view this';";
	locationsModel.find({dataKey:requestId}, function (err, docs) {
        if (docs.length){

        	var variables="var blackWhite="+docs[0].styles.isBlack+";var locations=["+docs[0].locations+"];";
        	variables=variables.replace(/(\r\n|\n|\r)/gm, "");
        	var scriptTags="<script>"+variables+"</script>";

        	var basicMap="<script src='http://localhost:3000/js/basicMap.js'></script>";

        	var myKey="https://maps.googleapis.com/maps/api/js?key="+_key+"&libraries=places&callback=initMap";
        	var script="<script src=\""+myKey+"\" async defer></script>";

        	code=scriptTags+basicMap+script;

        	
            
        }
        res.render("userData.ejs",{code:code});
         
    });
	
	
});

//get url of user
router.post("/callback",function(req,res){
	var user=req.body.url

});

router.get("/userDashboard",isLoggedIn,function(req,res){
	var userId=req.user.id;
	locationsModel.find({postedBy:userId},function(err,data){
		if(err)
		{
			console.log(err);
		}
		else{

			res.render('userDashboard.ejs');
		}
	});
});

function registerUser(req,res,userModel,sessionDataModel,locationsModel,crypto,passport,newUser,password,callback)
{
	    userModel.register(newUser, password, function(err, user){
        if(err){
            console.log(err);
            callback("/loginOrRegister/201");
        }
        passport.authenticate("local")(req, res, function(){
        	//create user then add session data to user
        	getData.findSessionDataById(sessionDataModel,req.session.id,function(data){
        		//transfer data session to user locations
        		var locations=[];
        		for(var i=0;i<data.locations.length;++i)
        		{
        			var location={
        				title:data.locations[i].title,
						address:data.locations[i].address,
						link:data.locations[i].link,
						phoneNumber:data.locations[i].phoneNumber,
						placeId:data.locations[i].placeId,
						uniqueId:data.locations[i].uniqueId,
						position:data.locations[i].position
        			};
        			locations.push(location);
        		}
        		var currentUser=user.id;
        		const idKey = crypto.randomBytes(8).toString("hex");
        		var newUserLocation=new locationsModel({
        			locations:locations,
        			dataKey:idKey,
        			styles:data.styles,
        			postedBy:currentUser

        		});
        		newUserLocation.save(function(err,data){
					if(err)
					{
						console.log(err);
						callback(null);
					}
					else{
						sessionDataModel.find({postedBy:req.session.id}).deleteOne(function(err){
							if(err)
							{
								console.log(err);
								callback(null);
							}
						});
					}
				});

        	});
           callback("/getCode"); 
        });
    });
}
module.exports = router;