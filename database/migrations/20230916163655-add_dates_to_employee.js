'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('employees', 'start_date', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
    })
      .then(() => {
        return queryInterface.addColumn('employees', 'cafe', {
          type: Sequelize.STRING,
          allowNull: true,
        });
      })
      .then(() => {
        return queryInterface.addColumn('employees', 'createdAt', {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        });
      })
      .then(() => {
        return queryInterface.addColumn('employees', 'updatedAt', {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        });
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('employees', 'start_date')
      .then(() => {
        return queryInterface.removeColumn('employees', 'cafe');
      })
      .then(() => {
        return queryInterface.removeColumn('employees', 'createdAt');
      })
      .then(() => {
        return queryInterface.removeColumn('employees', 'updatedAt');
      });
  },
};
