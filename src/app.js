const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const JobRoutes = require('./routes/jobRoutes'); 
const sequelize = require('./utils/db');
const UserProfile = require('./models/UserProfile');

const app = express();

// Use userRoutes
app.use('/users', userRoutes);

app.use(cors()); // Use CORS middleware
app.use(express.json()); // Parse JSON requests

app.use('/api/jobs', JobRoutes); 
app.use('/api/auth', authRoutes); // Use the auth routes

sequelize.sync({ alter: true }) // This syncs your models and updates the schema if needed
  .then(() => {
    console.log('Database synced');
  })
  .catch(error => {
    console.error('Error syncing database:', error);
  });


module.exports = app;