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

var key="AIzaSyCJyl_DjWAyQrgaRq_xAQjhPb22zUoi_xw";

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


app.use(express.static(__dirname + "/public"));

app.get('/',function (req,res) {
  res.render('main.ejs');
});

/*app.post('/main',function(req,res){
	var address=req.body.address;
	var link=req.body.link;
	var locations=getObject(address,link,key);
	res.redirect("/map");
});*/

app.get("/map",function(req,res){
	res.render("map.ejs");
});

app.listen(PORT,function() {
    console.log("Listening on Port:"+PORT);
});

/*function getLatLong(address,key)
{
	var url = "https://maps.googleapis.com"+
			"/maps/api/geocode/json?address="+address+"&key="+key;
	//console.log(url);
	var location= {lat:0,lng:0};

	request({
	    url: url,
	    json: true
	}, function (error, response, body) {
	    if (!error && response.statusCode === 200) {
	        location = body.results[0].geometry.location// Print the json response
	        return location;
	    }
	});
}
function getObject(address,link,key)
{
	var object=[];
	for(var i=0;i<address.length;++i)
	{
		if(address[i])
		{
			var position=getLatLong(address[i],key);
			console.log(position);

			var cur={
				position:position,
				address:address[i],
				link:link[i]};
			object.push(cur);
		}
	}
	console.log(object[0].position);
	return object;
}*/
app.post('/main',function(req,res){
	var address=req.body.address;
	var link=req.body.link;
	//var locations=getObject(address,link,key);
	//res.redirect("/map");

	async.forEachOf(address,(value,key,callback)=>{
		var objects=[];

		var url = "https://maps.googleapis.com"+
			"/maps/api/geocode/json?address="+address+"&key="+key;
	//console.log(url);
		var location= {lat:0,lng:0};

		request({url: url,json: true}, function (error, response, body) {
		    if (!error && response.statusCode === 200) {
		       // location = body.results[0].geometry.location// Print the json response
		       location="inside";
		       objects.push(location);
		    }
		    callback(objects);
		});


	},function(objects){
		console.log(objects);
		res.send("<h1>hello</h1>");
	});





});