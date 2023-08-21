const express = require('express');
const app = express();
const db = require('./db');
const cors = require('cors'); // Import the cors middleware

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello from Express backend!');
});

app.get('/data', async (req, res) => {
    try {
        const query = 'SELECT * FROM users';
        const [rows] = await db.promise().query(query);
        
        console.log('Rows:', rows); // Log the rows to inspect its structure
        
        res.json(rows); // Send the query result
    } catch (error) {
        console.error('Error fetching data from the database:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/total-users', async (req, res) => {
    try {
        const query = 'SELECT COUNT(*) AS totalUsers FROM users'; // Count the total number of users
        const [rows] = await db.promise().query(query);
        const totalUsers = rows[0].totalUsers;

        res.json({ totalUsers }); // Send the total number of users as JSON response
    } catch (error) {
        console.error('Error fetching total users from the database:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.use((req, res, next) => {
    console.log('Incoming request:', req.url);
    next();
  });
  
app.get('/testdb', async (req, res) => {
    try {
        const query = 'SELECT 1 + 1 AS result';
        const result = await db.query(query);
        const sum = result[0].result;
        console.log('Database connection test successful:', sum);
        res.json({ message: 'Database connection successful', sum });
    } catch (error) {
        console.error('Error testing database connection:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/test', (req, res) => {
    res.send('Hello from Express backend!');
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
