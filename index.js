const http=require('http');
const express=require('express');
const bodyParser=require('body-parser');
var flash= require("connect-flash");
var async=require("async");
var user=require('./models/user');
var localStrategy=require('passport-local');
var passport=require('passport');
var locationsModel=require('./models/locations');
const mongoose=require('mongoose');
var isLoggedIn=require('./services/middleWare/isLoggedIn');
const app=express();

//requiring routes

var homePage=require('./services/routes/homePage');
var locationsInput=require('./services/routes/locationsInput');
var loginAndRegister=require('./services/routes/loginAndRegister');
var map=require('./services/routes/map');

const PORT=3000;

mongoose.connect("mongodb://Admin:!Stephmybaby72517@ds053954.mlab.com:53954/flash_app");

app.use(bodyParser.urlencoded({extended: true}));
app.use(flash());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(require("express-session")({
    secret: "my jalos slkdefgrbrfgdargajf;al l",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.success = req.flash('success');
   res.locals.error = req.flash('error');
   next();
});

app.use(homePage,locationsInput,loginAndRegister,map,isLoggedIn);

app.listen(PORT,function() {
    console.log("Listening on Port:"+PORT);
});


