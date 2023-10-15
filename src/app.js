const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const JobRoutes = require('./routes/jobRoutes'); 
const emailRoutes = require('./routes/emailRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const sequelize = require('./utils/db');
const { swaggerUi, specs } = require('./swagger');
require('./models/Associations'); // Import and execute the associations.js file

const app = express();

app.use(cors()); // Use CORS middleware
app.use(express.json()); // Parse JSON requests

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs)); // Swagger documentation

// Use userRoutes
app.use('/api/users', userRoutes);
app.use('/api/jobs', JobRoutes); 
app.use('/api/auth', authRoutes); // Use the auth routes
app.use('/api/email', emailRoutes); // Use the auth routes
app.use('/api/review', reviewRoutes); // Use the auth routes

sequelize.sync({ alter: true }) // This syncs your models and updates the schema if needed
  .then(() => {
    console.log('Database synced');
  })
  .catch(error => {
    console.error('Error syncing database:', error);
  });


module.exports = app;