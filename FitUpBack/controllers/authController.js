const express = require('express');
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const pool = require('../db');

const getUsers = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT email FROM login');
        res.json(rows);
    } catch (error) {
        res.status(500).send('Server error');
    }
};

// Register with email and password
const register = async (req, res) => {
    try {
        console.log(1)
        console.log(process.env.DB)
        const { 
            email, 
            password,
            userInfo
        } = req.body;

        const [rows] = await pool.query('SELECT * FROM userCredentials WHERE email = ?', [email]);
        console.log(2)
        if (rows.length > 0) {
            return res.status(409).json({ message: 'Email already registered' });
        }

        const UID = uuidv4();
        const hashedPassword = await bcrypt.hash(password, 10);
        const payload = { id: UID };
        const token = jwt.sign(payload, process.env.JWT_SECRET);

        // save the credential information first
        const saveCredentialQuery = 'INSERT INTO userCredentials (UID, email, hashed_password) VALUES (?, ?, ?)';

        const saveCredential = await pool.query(saveCredentialQuery, [UID, email, hashedPassword]);
        console.log(userInfo)
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
        console.log(3);
        const saveInfoQuery = 'INSERT INTO userInfo (UID, height, weight, purpose, workout_schedule, gender, workout_style, personal_records, partner_preferences, first_name, last_name, school_year) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        
        const saveInfo = await pool.query(saveInfoQuery, 
            [UID, height, weight, purpose, JSON.stringify(workout_schedule), gender, workout_style, 
            JSON.stringify(personal_records), JSON.stringify(partner_preferences), first_name, last_name, school_year]);
        console.log(4)
        res.status(201).json({
            message: 'User registered successfully',
            token: token,
            UID: UID
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Login API 
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const [rows] = await pool.query('SELECT * FROM userCredentials WHERE email = ?', [email]);

        if (rows.length === 0) {
            return res.status(401).send('Invalid email or password');
        }

        const user = rows[0];
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

module.exports = {
    getUsers,
    register,
    login,
};

