const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const pool = require('../db');

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

        
        const saveCredentialQuery = 'INSERT INTO userCredentials (UID, email, hashed_password) VALUES (?, ?, ?)';
        await pool.query(saveCredentialQuery, [UID, email, hashedPassword]);

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

        const saveInfoQuery = 'INSERT INTO userInfo (UID, first_name, last_name, gender, age, height, weight, purpose, workout_schedule, workout_style, personal_records, partner_preferences, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        
        await pool.query(saveInfoQuery, [
            UID, 
            first_name, 
            last_name, 
            gender, 
            age, 
            height, 
            weight, 
            purpose, 
            JSON.stringify(workout_schedule), 
            workout_style, 
            JSON.stringify(personal_records), 
            JSON.stringify(partner_preferences),
            isActive
        ]);

        const payload = { id: UID };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '6h' });

        res.status(201).json({
            message: 'User registered successfully.',
            token
        });
    } catch (error) {
        console.error('Registration error:', error.message);
        res.status(500).json({ error: 'Failed to register user.' });
    }
};

const sendVerificationEmail = async (req, res) => {
    const verificationCode = Math.floor(10000 + Math.random() * 90000).toString();
    const { email } = req.body;
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, 
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_APP_PASSWORD,
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
        return res.status(201).json({ verificationCode: verificationCode });
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'Failed to send the email.' });
    }
};
    

//Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const [rows] = await pool.query('SELECT * FROM userCredentials WHERE email = ?', [email]);
        // console.log(rows)

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
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '6h' });

        return res.status(200).json({
            message: 'Login successful',
            token
        });
    } catch (error) {
        console.error("Error during login:", error.message);
        return res.status(500).json({ error: error.message });
    }
};


const updateUserInfo = async (req, res) => {
    const {
        UID,
        height,
        weight,
        purpose,
        squatPR,
        benchpressPR,
        deadliftPR,
        workoutSchedule,
    } = req.body;

    console.log(workoutSchedule)

    try {
        const updateQuery = `
            UPDATE userInfo
            SET
                height = ?,
                weight = ?,
                purpose = ?,
                personal_records = ?,
                workout_schedule = ?
            WHERE UID = ?`;

        const personal_records = {
            "squat": squatPR,
            "deadlift": deadliftPR,
            "benchpress": benchpressPR
        }
        await pool.query(updateQuery, [height, weight, purpose, JSON.stringify(personal_records), JSON.stringify(workoutSchedule), UID]);

        res.json({ message: "User profile updated successfully." });
    } catch (error) {
        console.error('Error updating user profile:', error.message);
        res.status(500).json({ message: "Failed to update user profile.", error: error.message });
    }
};


module.exports = {
    register,
    login,
    sendVerificationEmail,
    updateUserInfo,
};