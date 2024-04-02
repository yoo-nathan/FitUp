// db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '35.196.58.227',
    user: 'root',
    database: 'user', 
    password: '1q2w3e4r!Q@W#E$R!',
});

module.exports = pool;