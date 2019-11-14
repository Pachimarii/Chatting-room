const userController = require('../controller/userController');
var express = require('express');
// var passport = require('passport');
var dotenv = require('dotenv');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise


var userRoute = express.Router();

userRoute.get('/',function (req, res){
    const errors = req.flash('error');
    console.log(errors);
    res.render('signup',{title: 'Footballkik | Login', message: errors, hasErrors: errors.length>0});
});

userRoute.post('/',userController.validateForm,userController.accountValidation,userController.postSignUp);

module.exports = userRoute;