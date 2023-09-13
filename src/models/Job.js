const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const Category = require('./Category'); 
const User = require('./User'); 

const Job = sequelize.define('Job', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deadline: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  paymentType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  skillLevel: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  experienceRequired: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  jobStatus: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Define associations
Job.belongsTo(User, {
  foreignKey: 'user_id',
  indexes: [{ fields: ['user_id'] }],
});
Job.belongsTo(Category, { foreignKey: 'category_id' });

module.exports = Job;