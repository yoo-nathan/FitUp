const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


module.exports = router;

router.get('/confirm/:token', verifyEmail);


router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
