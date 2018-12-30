const http=require('http');
const express=require('express');
const bodyParser=require('body-parser');
var request = require("request");
var async=require("async");
//const postsModel=require('./models/posts');
const mongoose=require('mongoose');

const app=express();
const PORT=3000;

//mongoose.connect(process.env.MONGODB_URI.toString());

var _key="AIzaSyCJyl_DjWAyQrgaRq_xAQjhPb22zUoi_xw";

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


app.use(express.static(__dirname + "/public"));

app.get('/',function (req,res) {
  res.render('main.ejs');
});


app.listen(PORT,function() {
    console.log("Listening on Port:"+PORT);
});

app.post('/main',function(req,res){

	var address=req.body.address;
	var link=req.body.link;
	var objects=[];
	var i=0;

	/*async.forEachOf(address,(value,key,callback)=>{
		console.log("inside");

		var url = "https://maps.googleapis.com"+
			"/maps/api/geocode/json?address="+address+"&key="+_key;
		console.log(url);
		var location= {lat:0,lng:0};

		request({url: url,json: true}, function (error, response, body) {
		    if (!error && response.statusCode === 200) {
		       location=body;
		       objects.push(location);
		    }
		    else if(error)
		    {
		    	console.log(error);
		    }
		    if(i==address.length-1)
			{
				console.log(objects);
				callback(objects);
			}
			i++;
		});

	},function(objects){
		console.log(objects.length);
		res.redirect("/map");
		app.get("/map",function(req,res){
			console.log(location);
			res.render("map.ejs",{location:objects});
		});
	});*/

	/*var itemsProcessed = 0;

	[1, 2, 3].forEach((item, index, array) => {
		asyncFunction(item, () => {
			itemsProcessed++;
			if(itemsProcessed === array.length) {
			  callback();
			}
		});
	});*/
	var url=[];
	for(i=0;i<address.length;++i)
	{
		var urll = "https://maps.googleapis.com"+
			"/maps/api/geocode/json?address="+address[i]+"&key="+_key;
		url.push(urll);
	}
	var itemsProcessed = 0;
	url.forEach(function(item,i,array){
		request({url: item,json: true}, function (error, response, body) {
		    if (!error && response.statusCode === 200) {
		       location=body.results[0].geometry.location;
		       objects.push({location:location,address:address[i]});;
		    }
		    itemsProcessed++;
		    if(itemsProcessed === array.length)
		    {
		    	callback(objects);
		    }
		});
	});
	function callback (objects) { 
		console.log(objects);
		 }
		


});