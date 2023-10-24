const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const Message = sequelize.define("Message", {
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
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Message;
