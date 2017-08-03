'use strict';

module.exports = {
    up(queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'users',
            'is_active',
            {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            }
        )
    },
    down(queryInterface, Sequelize) {
        return queryInterface.dropTable('users');
    },
};