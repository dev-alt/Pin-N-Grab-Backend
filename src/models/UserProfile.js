const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

/**
 * Represents a user profile in the system.
 *
 * @typedef {Object} UserProfile
 * @property {string} firstName - The first name of the user.
 * @property {string} lastName - The last name of the user.
 * @property {...any} ...other - Other profile fields.
 */
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
});

module.exports = UserProfile;
