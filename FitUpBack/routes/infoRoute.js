const express = require('express');
const infoRouter = express.Router();
const infoController = require('../controllers/infoController');
const authenticateToken = require('../authMiddleWare');

infoRouter.get('/userName', infoController.getUserName);
<<<<<<< Updated upstream
infoRouter.get('/homepage', infoController.getUserInfo);
=======
infoRouter.get('/userEmail', infoController.getUserEmail);
infoRouter.get('/homepage', filter.filtering);
infoRouter.post('/changeProfilePic', authenticateToken, upload.single('profilePic'), infoController.changeProfilePicture);
infoRouter.get('/profilePicture/:uid', authenticateToken, infoController.getProfilePicture);



>>>>>>> Stashed changes

module.exports = infoRouter;