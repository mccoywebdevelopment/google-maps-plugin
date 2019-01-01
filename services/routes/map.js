var express = require("express");
var router  = express.Router();
var userModel = require("../../models/user");
var locationsModel=require("../../models/locations");
const mongoose=require('mongoose');

 /*var setId=req.params.setId;
  postsModel.find({postedBy:req.user._id}, (err, posts) => {
    if(err) {
      console.log(err);
    } else {
      posts=posts[0];
      var id=req.user._id;
      userModel.findById(id, (err, user) => {
        if(err) {
          console.log(err);
        } else {
          username=user.username;

          postsModel.find({_id:setId}, (err, posts) => {
          if(err) {
            console.log(err);
          } else {
            console.log(posts[0]);
            posts=posts[0];
            res.render('viewCards', {posts: posts,username:username});
          }
          });

        }
      });
    }
});*/
router.get('/viewMap',function(req,res){
	locationsModel.find({postedBy:req.user._id},function(err,locations){
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
			res.render('viewMap.ejs',{locations:data});
		}
	});
});

module.exports = router;