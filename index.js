const http=require('http');
const express=require('express');
const bodyParser=require('body-parser');
var request = require("request");
var async=require("async");
var locationsModel=require('./models/locations');
const mongoose=require('mongoose');

const app=express();
const PORT=3000;

//mongoose.connect(process.env.MONGODB_URI.toString());
mongoose.connect("mongodb://Admin:!Stephmybaby72517@ds053954.mlab.com:53954/flash_app");

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
	function callback (objects) 
	{ 
		console.log(objects);
		for(var i=0;i<objects.length;++i)
		{
			var locations=new locationsModel({
					address:objects[i].address,
					position:objects[i].location

			});
			locations.save(function(err,user){
					if(err)
					{
						console.log(err);
					}else{
						console.log(user);
					}
				});
		}

	}	
		
res.redirect('/map');

});

app.get('/map',function(req,res){
	locationsModel.find({},function(err,locations){
		if(err)
		{
			console.log(err);
		}
		else{
			var data=[];
			for(var i=0;i<locations.length;++i)
			{
				data.push(locations[i].position);
			}
			res.render('map.ejs',{locations:data});
		}
	});
});