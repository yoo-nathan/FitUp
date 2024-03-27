const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
// const authenticate = require('../authMiddleware');

// Define user-related routes
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;