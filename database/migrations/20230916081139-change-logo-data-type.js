'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('cafes', 'logo', {
      type: Sequelize.STRING,
      allowNull: true, 
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('cafes', 'logo', {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true, 
    });
  },
};
