const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const filter = require('./../filter')

module.exports = router;

// router.get('/confirm/:token', verifyEmail);


router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/filtering-users', filter.filtering);


module.exports = router;
