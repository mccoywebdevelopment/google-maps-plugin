function getPosition(address,key,callback)
{
	var urll = "https://maps.googleapis.com"+"/maps/api/geocode/json?address="+address+"&key="+_key;
	request({url: urll,json: true}, function (error, response, body) {
		if (!error && response.statusCode === 200) 
		{
			if(body.status=="OK")
			{
				console.log("location found.")
				var location=body.results[0].geometry.location;
				callback(location);
			}
			else{
				//No location found!!!!
				console.log("location not found")
				 var location=null;
				 callback(location);
			}
		}
		else if(error)
		{
			console.log(error);
		}
	});
}

module.exports.getPosition=getPosition;