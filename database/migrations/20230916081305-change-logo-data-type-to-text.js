'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('cafes', 'logo', {
      type: Sequelize.TEXT,
      allowNull: true, 
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('cafes', 'logo', {
      type: Sequelize.ARRAY(Sequelize.TEXT),
      allowNull: true, 
    });
  },
};
