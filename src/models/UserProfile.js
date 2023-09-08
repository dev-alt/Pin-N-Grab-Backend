const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const User = require('./User'); 

/**
 * Represents a user profile in the system.
 *
 * @typedef {Object} UserProfile
 * @property {string} bio - A brief user biography or description.
 * @property {string} dateOfBirth - The user's date of birth.
 * @property {string} gender - The user's gender.
 * @property {string} socialMediaLinks - Links to the user's social media profiles (stored as a JSON object).
 * @property {string} address - The user's address.
 * @property {string} profilePicture - Reference to the user's profile picture.
 * @property {string} website - Link to the user's personal website or blog.
 * @property {string} contactEmail - An alternative email address.
 * @property {string} contactPhone - An alternative phone number.
 */
const UserProfile = sequelize.define('UserProfile', {
  // Define profile-related fields
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  dateOfBirth: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  interests: {
    type: DataTypes.STRING, 
    allowNull: true,
  },
  socialMediaLinks: {
    type: DataTypes.JSON, // Store social media links as a JSON object.
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  profilePicture: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  website: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  contactEmail: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  contactPhone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

UserProfile.belongsTo(User);
User.hasOne(UserProfile);

module.exports = UserProfile;
