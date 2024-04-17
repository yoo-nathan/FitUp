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

const ActiveCheck = async (req, res) => {
  const { active } = req.body;
    
};

module.exports = {
  ActiveCheck
};
