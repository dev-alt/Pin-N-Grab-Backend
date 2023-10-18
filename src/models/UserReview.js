const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const UserReview = sequelize.define("UserReview", {
  reviewText: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM("Worker", "Client"),
    allowNull: false,
  },
});

module.exports = UserReview;
