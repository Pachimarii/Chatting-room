'use strict'
const passport =  require('passport');
const User = require('../models/userModels');
const LocalStrategy = require('passport-local').Strategy;


module.exports = function(passport) {
passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        //if no error, this would be null.
        done(err,user);
    });


});

//handle sign up function
passport.use('local.signup',new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
},(req,email,password,done)=>{
    User.findOne({'email':email},(err,user1)=>{
        //if we have some kinds of network error 
        if(err){
            return done(err);
        }
        if(user1){
            return done(null,false,req.flash('error','User with email already exist'));
        }
        // if we do not have this account , we created one.
       
        const newUser =  new User();
        newUser.username = req.body.username;
        newUser.email = req.body.email;
        newUser.password = newUser.encryptPassword(req.body.password);
        newUser.save((err)=>{
            done(null,newUser);
        })
    })
}));
}