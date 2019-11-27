const home = require('../controller/homeController');
var express = require('express');
var homeRouter = express.Router();

homeRouter.get('/home',home.getHomePage);

module.exports = homeRouter;