'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('employees', 'cafe');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('employees', 'cafe', {
      allowNull: true,
      type: Sequelize.STRING
    });
  }
};
