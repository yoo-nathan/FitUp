const express = require('express');
const infoRouter = express.Router();
const infoController = require('../controllers/infoController');
//const authenticateToken = require('../authMiddleWare');
const filter = require('../filter');


const multer = require('multer');
const storage = multer.memoryStorage();
const path = require('node:path');
const { getPic } = require('../controllers/infoController');







infoRouter.get('/userName', infoController.getUserName);
infoRouter.get('/userEmail', infoController.getUserEmail);
infoRouter.get('/homepage', filter.filtering);
infoRouter.post('/changePic', infoController.changePic);
infoRouter.get('/getPic', getPic); 






module.exports = infoRouter;
