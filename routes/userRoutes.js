const userController = require('../controller/userController');
var express = require('express');
var passport = require('passport');
var dotenv = require('dotenv');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise


var userRoute = express.Router();

userRoute.get('/signup',function (req, res){
    const errors = req.flash('error');
    console.log(errors);
    res.render('signup',{title: 'Footballkik | Login', message: errors, hasErrors: errors.length>0});
});

userRoute.post('/signup',userController.validateSignup,userController.accountValidation,userController.postSignUp);

userRoute.get('/',function (req, res){
    const errors = req.flash('error');
    console.log(errors);
    res.render('login',{title: 'Footballkik | Login', message: errors, hasErrors: errors.length>0});
});

userRoute.post('/',userController.validateLogin,
userController.accountValidation,
userController.postLogin);

//  Facebook Login
userRoute.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }) );
userRoute.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/home',
    failureRedirect: '/signup',
    failureFlash: true
}));
module.exports = userRoute;