const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const filter = require('./../filter')
const authenticateToken = require('./../authMiddleWare');
const { logout } = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/filtering-users', filter.filtering);
router.post('/updateUserInfo', authenticateToken, authController.updateUserInfo);






module.exports = router;
