const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
<<<<<<< HEAD
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB, 
    password: process.env.DB_PASSWORD,
=======
    host: '35.196.58.227',
    user: 'daniel',
    database: 'user', 
    password: '1q2w3e4r!Q@W#E$R!',
>>>>>>> e21d0e8618205c769132c7458eae1434caa4eb0a
});

module.exports = pool;