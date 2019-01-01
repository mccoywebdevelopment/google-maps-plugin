const mongoose=require('mongoose');
var passportLocalMongoose=require('passport-local-mongoose');


const Schema=mongoose.Schema;

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    isAdmin: {type: Boolean, default: false}
});

userSchema.plugin(passportLocalMongoose);


var User= mongoose.model("User",userSchema);




module.exports=User;