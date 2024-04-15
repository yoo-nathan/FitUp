// const express = require('express');
// const bcrypt = require('bcrypt');
// const mysql = require('mysql2/promise');
// const { v4: uuidv4 } = require('uuid');
// const jwt = require('jsonwebtoken');
require('dotenv').config();

const pool = require('../db');

const getUserName = async (req, res) => {
    try {
        const UID = req.query.uid;
        const results = await pool.query('SELECT first_name FROM userInfo WHERE UID = ?', [UID]);
        if (results.length > 0) {
            const userInfo = results[0];
            res.status(200).json(userInfo[0].first_name);
        } else {
            console.log("User Not Found")
            res.status(404).send('User not found');
        }
    } catch (error) {
        return res.status(500).send('Server error');
    }
};

const getUserInfo = async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM userInfo');
        if (results.length > 0) {
            console.log(results.length)
            res.status(200).json(results);
        } else {
            console.log("No record on the database");
            res.status(404).send("No record on the database");
        }
    } catch (error) {
        return res.status(500).send('Server error');
    }
}

module.exports = {
    getUserName,
    getUserInfo
};