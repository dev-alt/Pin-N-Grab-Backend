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
    tableName: 'Email', 
  });
  Email.belongsTo(User, {
    as: 'sender',
    foreignKey: 'senderUserId', 
  });
  
  Email.belongsTo(User, {
    as: 'recipient',
    foreignKey: 'recipientUserId', 
  });
  
module.exports = Email;
