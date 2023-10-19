const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const UserProfile = sequelize.define("UserProfile", {
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  dateOfBirth: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = UserProfile;
