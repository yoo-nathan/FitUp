const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('./db'); // Import the database connection

const app = express();
app.use(express.json());

// Get all users
app.get('/users', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT email FROM users'); // Don't select passwords
        res.json(rows);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

// Register new user
app.post('/users', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [req.body.email, hashedPassword]);
        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(500).send('Error registering new user');
    }
});

// Login
app.post('/users/login', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [req.body.email]);
        if (rows.length > 0) {
            const user = rows[0];
            if (await bcrypt.compare(req.body.password, user.password)) {
                res.send('Success');
            } else {
                res.send('Login Failed');
            }
        } else {
            res.status(400).send('User not found');
        }
    } catch (error) {
        res.status(500).send('Login error');
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
