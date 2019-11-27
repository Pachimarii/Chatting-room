const passport =  require('passport');
const {check,validationResult} = require('express-validator');

exports.validateSignup = [
    check('username').not().isEmpty().isLength({min: 5}).withMessage('Username is required and must be at least 5 characters.'),
    check('email').not().isEmpty().isEmail()
        .withMessage('Email is invalid'),
    check('password').not().isEmpty()
        .withMessage('Password is required and must be at least 5 characters.'),
];

exports.validateLogin = [
    check('email').not().isEmpty().isEmail()
        .withMessage('Email is invalid'),
    check('password').not().isEmpty()
        .withMessage('Password is required and must be at least 5 characters.'),
];

exports.accountValidation = function (req, res, next) {
    const err = validationResult(req);
    const reqErrors = err.array();
    const errors = reqErrors.filter(e => e.msg !== 'Invalid value');
    let messages = [];
    errors.forEach((error) => {
        messages.push(error.msg);
    });
    // req.flash('error', messages);
    if (messages.length > 0) {
        req.flash('error', messages);
        if (req.url == '/') {
            res.redirect('/');
        }else{
            res.redirect('/signup');
        }
       
    }else{
        return next();
    }
     
};

exports.postSignUp = passport.authenticate('local.signup', {
    successRedirect: `/home`,
    failureRedirect: '/signup',
    failureFlash: true
});

exports.postLogin = passport.authenticate('local.login', {
    successRedirect: '/home',
    failureRedirect: '/',
    failureFlash: true
});
