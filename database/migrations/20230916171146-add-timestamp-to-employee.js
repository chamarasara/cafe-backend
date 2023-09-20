'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('employees', 'created_at', {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        }).then(() => {
            return queryInterface.addColumn('employees', 'updated_at', {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
            });
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('employees', 'created_at').then(() => {
            return queryInterface.removeColumn('employees', 'updated_at');
        })
    }
};
