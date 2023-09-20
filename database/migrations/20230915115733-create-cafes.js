'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('cafes', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      location: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      logo: {
        allowNull: true,
        type: Sequelize.JSON,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('cafes');
  }
};
