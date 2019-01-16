function createUserJsFIle(userId,userData)
{

	var writeStream = fs.createWriteStream(__dirname + "/../../public/usersJS/"+userId+".js");

	writeStream.write("var clientPositions=");
	writeStream.write(JSON.stringify(userData));
	writeStream.write(";");
	writeStream.end();
}