const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const Category = require('./Category');
const User = require('./User');
const Location = require('./Location');
const Application = require('./Application'); 

const Job = sequelize.define('Job', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  details: {
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
    type: DataTypes.ENUM('Open', 'Completed', 'Closed', 'Deleted'),
    allowNull: false,
  },
  selected_user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

// Define associations
Job.hasMany(Application, {
  foreignKey: 'job_id',
});

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
