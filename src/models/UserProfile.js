const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const UserProfile = sequelize.define('UserProfile', {
  // Define profile-related fields
  firstName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  // ...other profile fields
});

module.exports = UserProfile;
