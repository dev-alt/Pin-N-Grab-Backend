const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const User = require('./User');

const Email = sequelize.define('Email', {
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  isStarred: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
},
  {
    tableName: 'Email', // Specify the exact table name
  });
  Email.belongsTo(User, {
    as: 'sender',
    foreignKey: 'senderUserId', // Update to 'senderUserId'
  });
  
  Email.belongsTo(User, {
    as: 'recipient',
    foreignKey: 'recipientUserId', // Update to 'recipientUserId'
  });
  
module.exports = Email;
