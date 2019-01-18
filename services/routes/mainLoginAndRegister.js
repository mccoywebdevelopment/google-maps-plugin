var express = require("express");
var router  = express.Router();
var passport = require("passport");
var user = require("../../models/user");


// show register form
router.get("/register", function(req, res){
   res.render("register"); 
});

//handle sign up logic
router.post("/register", function(req, res){
    console.log(req.body.username);
    var newUser = new user({username: req.body.username});
    user.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register", {error: err.message});
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/locationsInput"); 
        });
    });
});

//show login form
router.get("/login", function(req, res){
   res.render("login");
});

//handling login logic
router.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/locationsInput');
});

module.exports = router;