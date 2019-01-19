var fs = require("fs");
function getFiles(file1,file2,obfuscator,userId,savedLocation,callback)
{
	combineFiles(file1,file2,function(data){
		var code=obfuscator.obfuscateCode(data);
		console.log(typeof code);
		createUserJsFIle(userId,code,savedLocation);
		callback(data);
	});
}
function saveWithOutOb(file1,file2,userId,savedLocation,callback)
{
	combineFiles(file1,file2,function(data){
		createUserJsFIle(userId,data,savedLocation);
		callback("data saved"+data);
	});
}
function createUserJsFIle(userId,userData,savedLocation)
{
	var writeStream = fs.createWriteStream(savedLocation+"/"+userId+".js");
	writeStream.write(userData);
	writeStream.end();
}
function combineFiles(file1,file2,callback)
{
	fs.readFile(file1,function(err,data){
		if(err)
		{
			console.log(err);
			callback(null);
		}
		else{
			var variable=data;
			variable=variable+"/*=============================================================================================================================*/";
			fs.readFile(file2,function(err,data){
				if(err)
				{
					console.log(err);
					callback(null);
				}
				else{
					variable=variable+data;
					callback(variable);
				}
			});
		}
	});
}
module.exports.getFiles=getFiles;
module.exports.combineFiles=combineFiles;
module.exports.saveWithOutOb=saveWithOutOb;