module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Applications", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users", // Make sure this matches your User model
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      job_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Jobs", // Make sure this matches your Job model
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      applicationText: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Applications");
  },
};
