const chat = require('../controller/chatController');
var express = require('express');
var chatRouter = express.Router();

chatRouter.get('/groupchat/:name',chat.getGameChat);

module.exports = chatRouter;