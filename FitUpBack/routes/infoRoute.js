const express = require('express');
const infoRouter = express.Router();
const infoController = require('../controllers/infoController');
const authenticateToken = require('../authMiddleWare');

infoRouter.get('/userName', infoController.getUserName);

module.exports = infoRouter;