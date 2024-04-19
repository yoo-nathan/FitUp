const express = require('express');
const infoRouter = express.Router();
const infoController = require('../controllers/infoController');
const authenticateToken = require('../authMiddleWare');
const filter = require('../filter');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


infoRouter.get('/userName', infoController.getUserName);
infoRouter.get('/userEmail', infoController.getUserEmail);
infoRouter.get('/homepage', filter.filtering);
infoRouter.post('/changeProfilePic', authenticateToken, upload.single('profilePic'), infoController.changeProfilePicture);
infoRouter.get('/profilePicture/:uid', authenticateToken, infoController.getProfilePicture);




module.exports = infoRouter;