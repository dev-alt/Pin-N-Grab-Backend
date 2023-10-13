const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const Location = sequelize.define('Location', {
    regionName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cityName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  
module.exports = Location;
