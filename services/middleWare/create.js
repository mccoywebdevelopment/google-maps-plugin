/*var location1=new Location("test1","338 E Harvard",null,"480-703-1806",4,{lat:305,lng:23});
var location2=new Location("test2","338 E Harvard",null,"480-703-1806",4,{lat:305,lng:23});
var objects=[];
objects.push(location1);
objects.push(location2);
saveToDatabaseWithObject(req,user,session,objects,sessionDataModel,userModel,function(x){
	res.send(x);
});*/
var crypto = require("crypto");

function saveToDatabaseWithObject(req,locations,styles,mapName,sessionDataModel,locationModel,uniqueId,callback)
{
	if(req.user!=null)
	{
		createUserLocation(req.user.id,locationModel,locations,styles,mapName,uniqueId,function(data){
			callback(data);
		});
	}
	else{
		createSessionLocation(req.session.id,sessionDataModel,locations,styles,mapName,uniqueId,function(data){
			callback(data);
		});
	}
}
function createUserLocation(id,locationModel,objects,styles,mapName,uniqueId,callback){

	var locations=[];
	for(var i=0;i<objects.length;++i){
		var newLocation={
		title:objects[i].title,
		address:objects[i].address,
		link:objects[i].link,
		phoneNumber:objects[i].phoneNumber,
		placeId:objects[i].placeId,
		uniqueId:uniqueId,
		position:objects[i].position
		};
		locations.push(newLocation);
	}
	const idKey = crypto.randomBytes(8).toString("hex");
	var location=new locationModel({
		locations:locations,
		styles:styles,
		dataKey:idKey,
		mapName:mapName,
		postedBy:id
	});

	location.save(function(err,data){
		if(err)
		{
			console.log(err);
			callback(null);
		}
		else{
			callback(data);
		}
	});

}
function createSessionLocation(id,sessionModel,objects,styles,mapName,uniqueId,callback){
		var locations=[];
		for(var i=0;i<objects.length;++i){
			var newLocation={
				title:objects[i].title,
				address:objects[i].address,
				link:objects[i].link,
				phoneNumber:objects[i].phoneNumber,
				placeId:objects[i].placeId,
				uniqueId:uniqueId,
				position:objects[i].position
			};
			locations.push(newLocation);
		}

		var location=new sessionModel({
		locations:locations,
		styles:styles,
		mapName:mapName,
		postedBy:id
		});

		location.save(function(err,data){
			if(err)
			{
				console.log(err);
				callback(null);
			}
			else{

				callback(data);
			}
		});
}
function Location(title,address,link,phoneNumber,place,position){
		this.title=title;
		this.address=address;
		this.link=link;
		this.phoneNumber=phoneNumber;
		this.placeId=place;
		this.position=position;
};
module.exports.saveToDatabaseWithObject=saveToDatabaseWithObject;
module.exports.Location=Location;