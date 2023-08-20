const mysql = require('mysql2');


const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: 'root',
    password: 'root',
    database: 'Users',
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database');
        connection.release();
    }
});

module.exports = pool;
