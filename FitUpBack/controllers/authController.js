const express = require('express');
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');
const { v4: uuidv4 } = require('uuid'); 
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your-secret-key-here';

// MySQL database connection setup
const pool = mysql.createPool({
    host: '35.196.58.227',
    user: 'root',
    database: 'User',
    password: '1q2w3e4r!Q@W#E$R!',
});

const app = express();
app.use(express.json());

// Get all users
const getUsers = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT email FROM users'); 
        res.json(rows);
    } catch (error) {
        res.status(500).send('Server error');
    }
};

// Registering the User
const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        // handle an error when there's the same email in DB
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

        if (rows.length > 0) {
            return res.status(409).json({ message: 'Email already registered' });
        }
        
        const UID = uuidv4();
        const hashedPassword = await bcrypt.hash(password, 10);
        const payload = { id: UID };
        const token = jwt.sign(payload, JWT_SECRET);

        await pool.query('INSERT INTO users (UID, email, password) VALUES (?, ?, ?)', [UID, email, hashedPassword]);

        res.status(201).json({
            message: 'User registered successfully',
            token: token,
            UID: UID
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Log In API
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

        if (rows.length == 0) {
            return res.status(401).send('Invalid email or password');
        }

        const user = rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).send('Invalid email or password');
        }

        const payload = { id: user.UID };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({ 
            message: 'Login successful', 
            token 
        }); 
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
  register,
  login,
};
