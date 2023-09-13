const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

// Import other models if needed
const User = require('./User');

// Define the User model
const User = sequelize.define('User', {
  // User model definition here
});

// Define the UserProfile model
const UserProfile = sequelize.define('UserProfile', {
  // UserProfile model definition here
  // ...
});

// Define the Job model
const Job = sequelize.define('Job', {
  // Job model definition here
  // ...
});

// Define associations between models
UserProfile.belongsTo(User);
User.hasOne(UserProfile);
Job.belongsTo(User, {
  foreignKey: 'user_id',
  indexes: [{ fields: ['user_id'] }],
});

module.exports = {
  User,
  UserProfile,
  Job,
};
