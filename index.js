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

//requiring routes

var homePage=require('./services/routes/homePage');
var locationsInput=require('./services/routes/locationsInput');
var loginAndRegister=require('./services/routes/mainLoginAndRegister');
var test=require('./services/routes/test');
var getCode=require('./services/routes/getCode');

var PORT=3000;

if(process.env.PORT && process.env.MONGODB_URI.toString())
{
    const PORT=process.env.PORT;
    mongoose.connect(process.env.MONGODB_URI.toString());
}
else{
  PORT=3000;
  mongoose.connect("mongodb://Admin:!Stephmybaby72517@ds053954.mlab.com:53954/flash_app",function(err) {
    if (err) throw err;
});
}



/*mongoose.connect("mongodb://Admin:!Stephmybaby72517@ds053954.mlab.com:53954/flash_app",function(err) {
    if (err) throw err;
});*/

app.use(cookieParser());
app.use(session({
    secret: 'alksdjfl;akdjf;lajfijl;aejiovong490492420943u02lksadjl;af;l', // just a long random string
    resave: false,
    saveUninitialized: true
}));

//app.use(bodyParser.urlencoded({extended: true}));
//app.set("view engine", "ejs");
//app.use(express.static(__dirname + "/public"));
 app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(express.static(path.join(__dirname, 'public')));


app.use(require("express-session")({
    secret: "my jalos slkdefgrbrfgdargajf;al l",
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
   res.locals.success = req.flash('success');
   res.locals.error = req.flash('error');
   next();
});

app.use(homePage,locationsInput,getCode,loginAndRegister,test,isLoggedIn);

app.listen( process.env.PORT || 3000,function() {
    console.log("Listening on Port:"+PORT);
});


