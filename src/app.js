const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes'); // Check the correct path
const sequelize = require('./utils/db'); // Import the sequelize instance
const UserProfile = require('./models/UserProfile'); // Import your UserProfile model

const app = express();

// Use userRoutes
app.use('/users', userRoutes);

app.use(cors()); // Use CORS middleware
app.use(express.json()); // Parse JSON requests

app.use('/api/auth', authRoutes); // Use the auth routes

sequelize.sync({ alter: true }) // This syncs your models and updates the schema if needed
  .then(() => {
    console.log('Database synced');
  })
  .catch(error => {
    console.error('Error syncing database:', error);
  });


module.exports = app;