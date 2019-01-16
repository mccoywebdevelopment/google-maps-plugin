function getLocations(req,user,session,userModel,sessionDataModel,callback){
	if(user!=null)
	{
		findUserDataById(userModel,req.user.id,function(data){
			callback(data);
		});
	}
	else{
		findSessionDataById(sessionDataModel,req.session.id,function(data){
			callback(data);
		});
	}
}

function findUserDataById(UserModel,id,callback){
	UserModel.find({postedBy:id},function(err,data){
		if(err)
		{
			console.log(err);
			callback(null);
		}
		else{
			console.log(data);
			callback(data);
		}
	});
}
function findSessionDataById(sessionDataModel,id,callback){
	sessionDataModel.find({postedBy:id},function(err,data){
		if(err)
		{
			console.log(err);
			callback(null);
		}
		else{
			if(!data.locations)
			{
				console.log("Data does not exist");
				callback(null);
			}
			else{
				console.log("Data does exist.");
				callback(data);
			}
		}

	});
}

module.exports.getLocations=getLocations;
