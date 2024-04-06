const express = require('express');
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const nodemailer = require('nodemailer');
const pool = require('../db');

const sendVerificationEmail = async (email, token) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: 'Account Verification Token',
        html: `Please verify your account by clicking the link: <a href="${process.env.FRONTEND_URL}/confirm/${token}">Verify Your Account</a>`
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

const getUsers = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT email FROM login');
        res.json(rows);
    } catch (error) {
        res.status(500).send('Server error');
    }
};

const register = async (req, res) => {
    try {
        const { email, password, userInfo } = req.body;
        const [rows] = await pool.query('SELECT * FROM userCredentials WHERE email = ?', [email]);
        if (rows.length > 0) {
            return res.status(409).json({ message: 'Email already registered' });
        }

        const UID = uuidv4();
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = jwt.sign({ id: UID }, process.env.JWT_SECRET, { expiresIn: '1d' });
        await sendVerificationEmail(email, verificationToken);

        await pool.query('INSERT INTO userCredentials (UID, email, hashed_password, confirmed) VALUES (?, ?, ?, false)', [UID, email, hashedPassword]);

        const {
            first_name,
            last_name,
            gender, 
            school_year,
            height, 
            weight, 
            purpose, 
            workout_schedule, 
            workout_style, 
            personal_records, 
            partner_preferences,
        } = userInfo;

        await pool.query('INSERT INTO userInfo (UID, height, weight, purpose, workout_schedule, gender, workout_style, personal_records, partner_preferences, first_name, last_name, school_year) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [UID, height, weight, purpose, JSON.stringify(workout_schedule), gender, workout_style, 
            JSON.stringify(personal_records), JSON.stringify(partner_preferences), first_name, last_name, school_year]);

        res.status(201).json({
            message: 'Registration successful, please verify your email before logging in',
            UID: UID
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const [rows] = await pool.query('SELECT * FROM userCredentials WHERE email = ?', [email]);
        if (rows.length == 0) {
            return res.status(401).send('Invalid email or password');
        }

        const user = rows[0];
        if (!user.confirmed) {
            return res.status(401).send('Please verify your email before logging in.');
        }

        const isPasswordValid = await bcrypt.compare(password, user.hashed_password);
        if (!isPasswordValid) {
            return res.status(401).send('Invalid email or password');
        }

        const payload = { id: user.UID };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            message: 'Login successful',
            token
        });
    } catch (error) {
        console.error("Error during login:", error.message);
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getUsers,
    register,
    login,
};
