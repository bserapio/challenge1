'use strict';

module.exports = {
    up(queryInterface, Sequelize) {
        return queryInterface.createTable('users',
            {
                'id': {
                    'type': 'INTEGER',
                    'allowNull': false,
                    'primaryKey': true,
                    'autoIncrement': true,
                },
                'username': {
                    'type': 'VARCHAR(255)',
                    'allowNull': false,
                },
                'name': {
                    'type': 'VARCHAR(255)',
                    'allowNull': false,
                },
                'role': {
                    'type': 'VARCHAR(255)',
                    'allowNull': false,
                },
                'password': {
                    'type': 'VARCHAR(255)',
                    'allowNull': false,
                },
                'created_at': {
                    'type': 'TIMESTAMP WITH TIME ZONE',
                    'allowNull': false,
                },
                'modified_at': {
                    'type': 'TIMESTAMP WITH TIME ZONE',
                    'allowNull': false,
                },
            });
    },
    down(queryInterface, Sequelize) {
        return queryInterface.dropTable('users');
    },
};
