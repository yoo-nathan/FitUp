const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
app.use(express.json());

const pool = mysql.createPool({
    host: '35.196.58.227',
    user: 'daniel',
    database: 'User', 
    password: '1q2w3e4r!Q@W#E$R!',
});

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
    Active
};


  
