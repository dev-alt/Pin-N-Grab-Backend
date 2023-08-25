const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Require UserProfile model and create associations
const UserProfile = require('./UserProfile');
User.hasOne(UserProfile); // User has one UserProfile
UserProfile.belongsTo(User); // UserProfile belongs to User

module.exports = User;
