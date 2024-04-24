const express = require('express');
const infoRouter = express.Router();
const infoController = require('../controllers/infoController');

//const authenticateToken = require('../authMiddleWare');
const filter = require('../filter');

infoRouter.get('/userName', infoController.getUserName);
infoRouter.get('/userEmail', infoController.getUserEmail);
infoRouter.get('/homepage', filter.filtering);
infoRouter.post('/changePic', infoController.changePic);
infoRouter.get('/getPic', infoController.getPic); 
infoRouter.post('/updateActive', infoController.Active);


module.exports = infoRouter;
