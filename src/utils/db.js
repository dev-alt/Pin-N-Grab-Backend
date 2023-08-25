const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    username: 'root',
    password: 'root',
    database: 'mydb',
});

// Test the database connection
sequelize.authenticate()
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });

module.exports = sequelize;
