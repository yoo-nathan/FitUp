const nodemailer = require('nodemailer');
const express = require('express');

const app = express();
const PORT = 3000;



// Generate a 5-digit verification code using Math.random()
const verificationCode = Math.floor(10000 + Math.random() * 90000).toString();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: emailUser,
        pass: emailPass,
    },
});

// Email message options
const mailOptions = {
    from: `"Fitup" <${emailUser}>`, 
    to: 'dskoo0416@gmail.com', 
    subject: 'Verification Code from Node.js', 
    text: `Your verification code is: ${verificationCode}`, 
};

// Send email with verification code
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error sending email:', error);
    } else {
        console.log('Email sent: %s', info.messageId);
    }
});

// Setup a simple route for verification
app.get('/verify', (req, res) => {
    const { code } = req.query;
    if (code === verificationCode) {
        res.send('Verification successful');
    } else {
        res.send('Invalid verification code');
    }
});

const verifyEmail = async (req, res) => {
    // Verification logic here
    res.send("Verification endpoint hit. Logic to be implemented.");
};

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
