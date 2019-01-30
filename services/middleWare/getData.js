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
			if(!data[0].locations)
			{
				console.log("Data does not exist");
				callback(null);
			}
			else{
				callback(data[0]);
			}
		}

	});
}

module.exports.getLocations=getLocations;
module.exports.findSessionDataById=findSessionDataById;
