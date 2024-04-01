const { Pool } = require('pg');
const fs = require('fs'); 

// const serverCA = fs.readFileSync('../certificate/server-ca.pem').toString();
// const clientCert = fs.readFileSync('../certificate/client-cert.pem').toString();
// const clientKey = fs.readFileSync('../certificate/client-key.pem').toString();

const pool = new Pool({
    user: 'postgres',
    host: '35.196.1.236', 
    database: 'postgres', 
    password: '1q2w3e4r!Q@W#E$R!', 
    port: 5432, 
    // ssl: {
    //     rejectUnauthorized: true, // or false if you do not want to check against the CA
    //     ca: serverCA,
    //     key: clientKey,
    //     cert: clientCert
    // }
});

// pool.connect(err => {
//     if (err) {
//         console.log('Failed to connect db ' + err)
//     } else {
//         console.log('Connect to db done!')
//     }
//     })

module.exports = pool;
