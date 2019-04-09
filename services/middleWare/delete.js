function deleteByPlaceId(req,user,session,userModel,sessionDataModel,placeId,callback)
{
	if(user!=null)
	{
		deleteByUserPlaceId(req.user.id,userModel,placeId,function(data){
			callback(data);
		});
	}
	else{

		deleteBySessionPlaceId(req.session.id,sessionDataModel,placeId,function(data){
			callback(data);
		});
	}
}
function deleteByUserPlaceId(id,userModel,placeId,callback){
	UserModel.deleteOne({postedBy:id},function(err,data){
		if(err)
		{
			console.log(err);
			callback(null);
		}
		else{
			var match=false;
			var newData=null;
			for(var i=0;i<data[0].locations.length;++i)
			{
				if(data[0].locations[i].placeId==placeId)
				{
					match=true;
					newData=data[0].locations[i];
				}
			}
			if(match==false)
			{
				console.log("No matches for placeId:"+placeId);
			}
			callback(newData);
		}
	});
}
function deleteBySessionPlaceId(id,sessionModel,selectedPlace,callback){
	sessionModel.update(
    {postedBy:id},
    { $pull: {locations:{placeId:selectedPlace}}},function(err,data){
    	if(err)
    	{
    		console.log(err);
    		callback(null);
    	}
    	else{
    		callback(true);
    	}
    }
	);
