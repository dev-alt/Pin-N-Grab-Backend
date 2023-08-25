const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes'); // Check the correct path
const db = require('./utils/db');

const app = express();

// Use userRoutes
app.use('/users', userRoutes);

app.use(cors()); // Use CORS middleware
app.use(express.json()); // Parse JSON requests

app.use('/api/auth', authRoutes); // Use the auth routes




module.exports = app;