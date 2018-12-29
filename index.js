const http=require('http');
const express=require('express');
const bodyParser=require('body-parser');
//const postsModel=require('./models/posts');
const mongoose=require('mongoose');

const app=express();
const PORT=3000;

//mongoose.connect(process.env.MONGODB_URI.toString());

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


app.use(express.static(__dirname + "/public"));

app.get('/',function (req,res) {
  res.render('main.ejs');
});

app.post('/main',function(req,res){
	var address=req.body.address;
	var link=req.body.link;
	var locations=getObject(address,link);
	console.log(locations);
	res.redirect("/");
});

app.listen(PORT,function() {
    console.log("Listening on Port:"+PORT);
});

function getObject(address,link)
{
	var object=[];
	for(var i=0;i<address.length;++i)
	{
		if(address[i])
		{
			var cur={
				address:address[i],
				link:link[i]};
			object.push(cur);
		}
	}
	return object;
}