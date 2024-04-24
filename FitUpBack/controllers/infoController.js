// const express = require('express');
// const bcrypt = require('bcrypt');
// const mysql = require('mysql2/promise');
// const { v4: uuidv4 } = require('uuid');
// const jwt = require('jsonwebtoken');

const multer = require('multer');
const path = require('node:path');
const storage = multer.memoryStorage();
const pool = require('../db'); 

require('dotenv').config();


const getUserName = async (req, res) => {
    try {
        const UID = req.query.uid;
        const results = await pool.query('SELECT first_name, last_name FROM userInfo WHERE UID = ?', [UID]);
        if (results.length > 0) {
            const userInfo = results[0];
            res.status(200).json(`${userInfo[0].first_name} ${userInfo[0].last_name}`);
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
                email: result[0].email
                //email: result[0]['email']
            })
        }
    } catch (error) {
        return res.status(500).send('Server error');
    }
}


const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
    cb(null, true);
    } else {
    cb(new Error('Only images are allowed!'), false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter }).single('profilePic');



const changePic = (req, res) => {
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            console.error('MulterError:', err);
            return res.status(500).send('A Multer error occurred when uploading.');
        // biome-ignore lint/style/noUselessElse: <explanation>
        } else if (err) {
            // An unknown error occurred when uploading.
            console.error('Unknown error during upload:', err);
            return res.status(500).send('An unknown error occurred when uploading.');
        }
        
        // If `req.file` is undefined, it means no file was uploaded
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        const { UID } = req.body; // UID is taken from the body, ensure you're sending it in the body

        try {
            const [existingEntry] = await pool.query('SELECT * FROM image WHERE UID = ?', [UID]);
            
            if (existingEntry.length > 0) {
                // Update existing image
                await pool.query('UPDATE image SET profilePic = ? WHERE UID = ?', [req.file.buffer, UID]);
                return res.status(200).send('Image updated successfully.');
            // biome-ignore lint/style/noUselessElse: <explanation>
            } else {
                // Insert new image
                await pool.query('INSERT INTO image (UID, profilePic) VALUES (?, ?)', [UID, req.file.buffer]);
                return res.status(201).send('Image added successfully.');
            }
        } catch (error) {
            console.error('Database error:', error);
            return res.status(500).send('Server error');
        }
    });
};


const getPic = async (req, res) => {
    const UID = req.headers.uid; // Assuming you're passing 'UID' as the header key

    console.log("Fetching image for UID:", UID); // Debugging log

    try {
        const [rows] = await pool.query('SELECT profilePic FROM image WHERE UID = ?', [UID]);
        console.log("Query result:", rows); // Debugging log

        if (rows && rows.length > 0) {
            const imageBuffer = rows[0].profilePic;
            res.setHeader('Content-Type', 'image/jpeg');
            res.send(imageBuffer);
        } else {
            res.status(404).send('No image found for this UID');
        }
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).send('Failed to retrieve image');
    }
};

const Active = async (req, res) => {
    const { UID, isActive } = req.body;

    try {
        const activeStatus = isActive ? 1 : 0;
        const query = 'UPDATE userInfo SET isActive = ? WHERE UID = ?';
        const [result] = await pool.execute(query, [activeStatus, UID]);
  
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User status updated successfully', isActive });
    } catch (error) {
        console.error('Error updating user status:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



module.exports = {
    getUserName,
    getUserInfo,
    getUserEmail,
    changePic,
    getPic,
    Active
};