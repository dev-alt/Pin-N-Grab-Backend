const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const User = require('./User');
const Job = require('./Job');

const UserReview = sequelize.define('UserReview', {
  reviewText: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Define associations
UserReview.belongsTo(User, {
  foreignKey: 'reviewerUserId',
  as: 'reviewer', 
  onDelete: 'CASCADE',
});

UserReview.belongsTo(Job, {
  foreignKey: 'jobId',
  onDelete: 'CASCADE', 
});

module.exports = UserReview;