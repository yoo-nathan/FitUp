const express = require('express');
const infoRouter = express.Router();
const infoController = require('../controllers/infoController');
const authenticateToken = require('../authMiddleWare');
const filter = require('../filter');

infoRouter.get('/userName', infoController.getUserName);
infoRouter.get('/homepage', filter.filtering);

module.exports = infoRouter;