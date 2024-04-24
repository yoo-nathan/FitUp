const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const filter = require('./../filter')
// const authenticateToken = require('./../authMiddleWare');
const { logout } = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/filtering-users', filter.filtering);
<<<<<<< HEAD
// router.post('/logout', authController.logout);
router.post('/updateProfile', authController.updateUserInfo);
//router.post('/logout', logout); 
=======
router.post('/updateUserInfo', authenticateToken, authController.updateUserInfo);
router.post('/triggerEmailVerification', authController.triggerEmailVerification); // Add this line



>>>>>>> 492074596842f0d981ce4cae0361ef7a210d119a



module.exports = router;
