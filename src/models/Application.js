const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const Application = sequelize.define("Application", {
  applicationText: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Application;
