const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'esgi-b3-reservation-restaurant'
});

module.exports = pool;