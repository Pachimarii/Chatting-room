const groupController = require('../controllers/groupControllers');
var express = require('express');
var groupRouter = express.Router();


groupRouter.get('/group/:name',groupController.getGroupPage);
groupRouter.post('/group/:name', groupController.groupPostPage);

module.exports = groupRouter;