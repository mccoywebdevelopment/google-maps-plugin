const express=require('express');
var router  = express.Router();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var userModel = require("../../models/user");
var key = require('../../config/config.js');

passport.use(new GoogleStrategy({
  clientID: key.GOOGLE_AUTH_CLIENT_ID,
  clientSecret: key.GOOGLE_AUTH_CLIENT_SECRET,
  callbackURL: key.GOOGLE_AUTH_CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
  console.log(profile);
  var me = new userModel({
    userName:profile.emails[0].value,
  });

  /* save if new */
  userModel.findOne({email:me.email}, function(err, u) {
    if(!u) {
      me.save(function(err, me) {
        if(err) return done(err);
        done(null,me);
      });
    } else {
      console.log(u);
      done(null, u);
    }
  });
}
));
// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback

router.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));




// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/auth/google/redirect', 
  passport.authenticate('google', { failureRedirect: '/test' }),
  function(req, res) {
    //res.redirect('/getCode');
    res.send("GetCode");
  });


module.exports = router;