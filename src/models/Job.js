const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const Job = sequelize.define("Job", {
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
  paymentAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  jobStatus: {
    type: DataTypes.ENUM("Open", "Completed", "Closed", "Deleted"),
    allowNull: false,
  },
  selected_user: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = Job;
