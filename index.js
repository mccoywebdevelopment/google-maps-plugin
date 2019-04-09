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
var cookieParser = require('cookie-parser');
var session = require('express-session');
var path=require('path');
const app=express();
var key=require('./config/config');

var PORT=3000;

if(process.env.PORT && process.env.MONGODB_URI.toString())
{
    const PORT=process.env.PORT;
    mongoose.connect(process.env.MONGODB_URI.toString());
}
else{
  PORT=3000;
  mongoose.connect(key.MONGODB_KEY,function(err) {
    if (err) throw err;
});
}


app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));


app.use(require("express-session")({
    secret: key.SESSION_KEY,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(user.createStrategy());
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});

var homePage=require('./services/routes/homePage');
var locationsInput=require('./services/routes/locationsInput');
var loginAndRegister=require('./services/routes/mainLoginAndRegister');
var test=require('./services/routes/test');
var getCode=require('./services/routes/getCode');
var googleStrategy=require('./services/routes/googleStrategy');

app.use(homePage,locationsInput,googleStrategy,getCode,loginAndRegister,test,isLoggedIn);

app.listen( process.env.PORT || 3000,function() {
    console.log("Listening on Port:"+PORT);
});


