/*function getData(req)
{
	var data=null;
	if(req.user!=null)
	{
		locationsModel.find({postedBy:req.user._id},function(err,locations){
			if(err)
			{
				console.log(err);
			}
			else{
				console.log("found login user model.");
				data=locations;
				return data;
			}
		});
	}
	else{
		sessionDataModel.find({postedId:req.session.id},function(err,locations){
			if(err)
			{
				console.log(err);
			}
			else{
				console.log("found session model.");
				console.log(locations[0]);
				console.log("End found session model.");
				return locations[0]
			}
		});
	}
}*/