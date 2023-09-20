'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('employees', 'cafe_name', {
      type: Sequelize.STRING,
      allowNull: true, 
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('employees', 'cafe_name', {
      type: Sequelize.DATE, 
      allowNull: true,
    });
  },
};
