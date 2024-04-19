// const express = require('express');
// const bcrypt = require('bcrypt');
// const mysql = require('mysql2/promise');
// const { v4: uuidv4 } = require('uuid');
// const jwt = require('jsonwebtoken');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

require('dotenv').config();

const pool = require('../db');

const getUserName = async (req, res) => {
    try {
        const UID = req.query.uid;
        const results = await pool.query('SELECT first_name, last_name FROM userInfo WHERE UID = ?', [UID]);
        if (results.length > 0) {
            const userInfo = results[0];
            res.status(200).json(userInfo[0].first_name + " " + userInfo[0].last_name);
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
            res.status(200).json(results);
        } else {
            console.log("No record on the database");
            res.status(404).send("No record on the database");
        }
    } catch (error) {
        return res.status(500).send('Server error');
    }
}

const getUserEmail = async (req, res) => {
    try {
        const uid = req.query.UID;

        const searchQuery = 'SELECT email FROM userCredentials WHERE UID = ?';
        const [result] = await pool.query(searchQuery, [uid]);

        if (result.length > 0) {
            return res.status(201).json({
                email: result[0]['email']
            })
        }
    } catch (error) {
        return res.status(500).send('Server error');
    }
}

const getProfilePicture = async (req, res) => {
    const UID = req.params.uid;  // UID passed as a URL parameter

    try {
        const [results] = await pool.query('SELECT profilePic FROM image WHERE UID = ?', [UID]);
        if (results.length > 0) {
            // Send the image as a buffer
            res.writeHead(200, {
                'Content-Type': 'image/jpeg',  // Adjust content type based on your image format
                'Content-Length': results[0].profilePic.length
            });
            res.end(results[0].profilePic);  // Sending the BLOB data as an image
        } else {
            res.status(404).send('No profile picture found');
        }
    } catch (error) {
        console.error('Error fetching profile picture:', error.message);
        res.status(500).send('Server error');
    }
};


const changeProfilePicture = async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }

    const UID = req.body.uid;  
    const imageBuffer = req.file.buffer;
    
    try {
        await pool.query('UPDATE image SET profilePic = ? WHERE UID = ?', [imageBuffer, UID]);
        res.status(200).send('Profile picture updated successfully');
    } catch (error) {
        console.error('Error updating profile picture:', error.message);
        res.status(500).send('Server error');
    }
};

module.exports = {
    getUserName,
    getUserInfo,
    getUserEmail,
    getProfilePicture,
    changeProfilePicture
};