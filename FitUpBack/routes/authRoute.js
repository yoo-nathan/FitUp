const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const filter = require('./../filter')


router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/filtering-users', filter.filtering);
router.post('/logout', logout);
router.post('/updateProfile', authenticateToken, updateUserInfo);




module.exports = router;
