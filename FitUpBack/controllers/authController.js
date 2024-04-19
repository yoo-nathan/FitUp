const nodemailer = require('nodemailer');
const express = require('express');
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(express.json());

const pool = require('../db');


const getUsers = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT email FROM login');
        res.json(rows);
    } catch (error) {
        res.status(500).send('Server error');
    }
};

//Register
const register = async (req, res) => {
    const { email, password, userInfo } = req.body;

    try {
        const [existingUsers] = await pool.query('SELECT * FROM userCredentials WHERE email = ?', [email]);
        if (existingUsers.length > 0) {
            return res.status(409).json({ message: 'Email already registered' });
        }

        const UID = uuidv4();
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationCode = Math.floor(10000 + Math.random() * 90000).toString();

        await exports.sendVerificationEmail(email, verificationCode); 
        
        const saveCredentialQuery = 'INSERT INTO userCredentials (UID, email, hashed_password, verification_code) VALUES (?, ?, ?, ?)';
        await pool.query(saveCredentialQuery, [UID, email, hashedPassword, verificationCode]);

        const {
            first_name,
            last_name,
            gender, 
            age,
            height, 
            weight, 
            purpose, 
            workout_schedule, 
            workout_style, 
            personal_records, 
            partner_preferences,
            isActive
        } = userInfo;

        const saveInfoQuery = 'INSERT INTO userInfo (UID, first_name, last_name, gender, school_year, height, weight, purpose, workout_schedule, workout_style, personal_records, partner_preferences) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        
        await pool.query(saveInfoQuery, [
            UID, 
            first_name, 
            last_name, 
            gender, 
            school_year, 
            height, 
            weight, 
            purpose, 
            JSON.stringify(workout_schedule), 
            workout_style, 
            JSON.stringify(personal_records), 
            JSON.stringify(partner_preferences)
        ]);

        res.status(201).json({
            message: 'User registered successfully. Please verify your email.',
            UID: UID
        });
    } catch (error) {
        console.error('Registration error:', error.message);
        res.status(500).json({ error: 'Failed to register user.' });
    }
};

// Send Verification Email
const sendVerificationEmail = async (email, verificationCode) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, 
        auth: {
            user: "authenticatemailaddress@gmail.com",
            pass: "hsqs eiyr eccx ipig",
        },
    });

    const mailOptions = {
        from: `"FitUp" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Verification Code from FitUp',
        text: `Your verification code is: ${verificationCode}`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

//Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const [rows] = await pool.query('SELECT * FROM userCredentials WHERE email = ?', [email]);
        console.log(rows)

        if (rows.length === 0) {
            return res.status(401).send('Invalid email or password');
        }

        const user = rows[0];
        console.log(user.UID)
        const isPasswordValid = await bcrypt.compare(password, user.hashed_password);

        if (!isPasswordValid) {
            return res.status(401).send('Invalid email or password');
        }

        const payload = { id: user.UID };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({
            message: 'Login successful',
            token
        });
    } catch (error) {
        console.error("Error during login:", error.message);
        return res.status(500).json({ error: error.message });
    }
};


// Verify Email
const verifyEmail = async (req, res) => {
    const { email, verificationCode } = req.body;

    try {
        const [users] = await pool.query('SELECT * FROM userCredentials WHERE email = ? AND verification_code = ?', [email, verificationCode]);
        if (users.length === 0) {
            return res.status(400).json({ message: 'Invalid verification code or email' });
        }

        await pool.query('UPDATE userCredentials SET is_verified = 1 WHERE email = ?', [email]);
        res.json({ message: 'Email successfully verified' });
    } catch (error) {
        console.error('Verification error:', error.message);
        res.status(500).json({ error: 'Failed to verify email.' });
    }
};


const updateUserInfo = async (req, res) => {
    // Extract user ID from the JWT token assumed to be included in the user object by authentication middleware
    const UID = req.user.id;  // Assuming 'id' is a property in JWT payload

    // Extract user data from the request body
    const {
        first_name,
        last_name,
        gender,
        age,
        height,
        weight,
        purpose,
        workout_schedule,
        workout_style,
        personal_records,
        partner_preferences,
        isActive
    } = req.body;

    try {
        // Prepare and execute the SQL query to update user information
        const updateQuery = `
            UPDATE userInfo
            SET
                first_name = ?,
                last_name = ?,
                gender = ?,
                age = ?,
                height = ?,
                weight = ?,
                purpose = ?,
                workout_schedule = ?,
                workout_style = ?,
                personal_records = ?,
                partner_preferences = ?,
                isActive = ?
            WHERE UID = ?`;

        await pool.query(updateQuery, [
            first_name, last_name, gender, age, height, weight, purpose,
            JSON.stringify(workout_schedule), workout_style, JSON.stringify(personal_records),
            JSON.stringify(partner_preferences), isActive, UID
        ]);

        res.json({ message: "User profile updated successfully." });
    } catch (error) {
        console.error('Error updating user profile:', error.message);
        res.status(500).json({ message: "Failed to update user profile.", error: error.message });
    }
};



const logout = async (req, res) => {
    // Since actual logout logic is handled client-side, just return a successful response
    res.status(200).send({ message: "Logged out successfully" });
};



module.exports = {
    register,
    login,
    verifyEmail,
    sendVerificationEmail,
    updateUserInfo,
};

