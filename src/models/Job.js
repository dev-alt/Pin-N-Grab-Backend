const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const Category = require('./Category'); 
const User = require('./User'); 
const Location = require('./Location');

const Job = sequelize.define('Job', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
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
  jobStatus: {
    type: DataTypes.ENUM('Open', 'Closed', 'Deleted'), 
    allowNull: false,
  },
});

// Define associations
Job.belongsTo(User, {
  foreignKey: 'user_id',
  indexes: [{ fields: ['user_id'] }],
});
Job.belongsTo(Category, { foreignKey: 'category_id' });
Job.belongsTo(Location, {
  foreignKey: {
    name: 'location_id',
    allowNull: false,
  },
});


module.exports = Job;