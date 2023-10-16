module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Jobs', 'paymentAmount', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Jobs', 'paymentAmount', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
