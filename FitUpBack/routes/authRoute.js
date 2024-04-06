const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');





router.get('/confirm/:token', async (req, res) => {
    try {
        const { token } = req.params;
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        await pool.query('UPDATE userCredentials SET confirmed = true WHERE UID = ?', [id]);
        res.redirect(`${process.env.FRONTEND_URL}/login-confirmed`); // Redirect to a confirmation page
    } catch (error) {
        res.status(500).send('Error verifying email');
    }
});

module.exports = router;

router.get('/confirm/:token', verifyEmail);
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
