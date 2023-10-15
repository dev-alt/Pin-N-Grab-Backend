'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('ALTER TYPE "enum_Jobs_jobStatus" ADD VALUE IF NOT EXISTS \'Completed\';');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('ALTER TYPE "enum_Jobs_jobStatus" DROP VALUE IF EXISTS \'Completed\';');
  },
};
