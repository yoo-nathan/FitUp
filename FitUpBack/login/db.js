const { Pool } = require('pg');
const pool = new Pool({
    user: 'daniel',
    host: 'localhost',
    database: 'user_management',
    password: '1q2w3e4r!Q@W#E$R!',
    port: 5432,
});

module.exports = pool;