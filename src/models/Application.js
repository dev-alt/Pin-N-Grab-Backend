const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const Application = sequelize.define('Application', {
  applicationText: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

// Define associations
Application.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Application.belongsTo(Job, {
  foreignKey: 'job_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

module.exports = Application;
