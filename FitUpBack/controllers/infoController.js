// const express = require('express');
// const bcrypt = require('bcrypt');
// const mysql = require('mysql2/promise');
// const { v4: uuidv4 } = require('uuid');
// const jwt = require('jsonwebtoken');
require('dotenv').config();

const pool = require('../db');

const getUserName = async (req, res) => {
    try {
        const UID = req.userId;
        console.log("UID from the client: " + UID)
        const results = await pool.query('SELECT first_name FROM userInfo WHERE UID = ?', [UID]);
        console.log('processing userinfo...')
        if (results.length > 0) {
            const userInfo = results[0];
            console.log("processing userinfo done!")
            res.status(200).json(userInfo[0].first_name);
        } else {
            console.log("User Not Found")
            res.status(404).send('User not found');
        }
    } catch (error) {
        return res.status(500).send('Server error');
    }
};

module.exports = {
    getUserName
};