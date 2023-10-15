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
  interests: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  socialMediaLinks: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  profilePicture: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  website: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  contactEmail: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  contactPhone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = UserProfile;
