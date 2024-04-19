const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const filter = require('./../filter')
const authenticateToken = require('./../authMiddleWare');


router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/filtering-users', filter.filtering);
// router.post('/logout', authController.logout);
router.post('/updateProfile', authenticateToken, authController.updateUserInfo);




module.exports = router;
