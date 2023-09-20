'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('cafes', 'created_at', {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        }).then(() => {
            return queryInterface.addColumn('cafes', 'updated_at', {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
            });
        }).then(() => {
            return queryInterface.addColumn('cafes', 'started_date', {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            });
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('cafes', 'created_at').then(() => {
            return queryInterface.removeColumn('cafes', 'updated_at');
        }).then(() => {
            return queryInterface.removeColumn('cafes', 'started_date');
        });
    }
};
