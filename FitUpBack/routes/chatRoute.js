const express = require('express');
const chatRouter = express.Router();
const chatController = require('../controllers/chatController');
const authenticateToken = require('../authMiddleWare');

chatRouter.post('/saveLog', chatController.saveChatLog);
chatRouter.post('/saveRecentMsg', chatController.saveMostRecentMsg);
chatRouter.get('/getMyUid', authenticateToken, chatController.getMyUID);
chatRouter.get('/getHistory', chatController.getChatLog);
chatRouter.get('/getRecentMsg', chatController.getMostRecentMsg);
chatRouter.get('/getList', chatController.getChatList);

module.exports = chatRouter;