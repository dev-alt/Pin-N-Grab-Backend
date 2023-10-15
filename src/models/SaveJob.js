const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const SavedJob = sequelize.define("SavedJob", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  jobId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = SavedJob;
