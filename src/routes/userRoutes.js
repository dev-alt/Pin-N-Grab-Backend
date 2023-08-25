const express = require('express');
const router = express.Router();

const db = require('../utils/db');

// Define your routes
router.get('/', (req, res) => {
    res.send('Hello from user routes!');
});

router.get('/test-route', (req, res) => {
    res.json({ message: 'This is a test route' });
});

router.get('/data', async (req, res) => {
    try {
        const query = 'SELECT * FROM users';
        const [rows] = await db.query(query); // Use the query method directly
        console.log('Rows:', rows);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching data from the database:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/total-users', async (req, res) => {
    try {
        const query = 'SELECT COUNT(*) AS totalUsers FROM users';
        const [rows] = await db.query(query);
        const totalUsers = rows[0].totalUsers;

        res.json({ totalUsers });
    } catch (error) {
        console.error('Error fetching total users from the database:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Export the router
module.exports = router;
