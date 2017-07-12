'use strict';

module.exports = {
    up(queryInterface, Sequelize) {
        return queryInterface.createTable('client_db',
            {
                'id': {
                    'type': 'INTEGER',
                    'allowNull': false,
                    'primaryKey': true,
                    'autoIncrement': true,
                },
                'clientId': {
                    'type': 'INTEGER',
                    'allowNull': true,
                },
                'identifier': {
                    'type': 'VARCHAR(31)',
                    'allowNull': false,
                },
                'name': {
                    'type': 'VARCHAR(255)',
                    'allowNull': false,
                },
                'lang': {
                    'type': 'VARCHAR(2)',
                    'allowNull': true,
                },
                'dbName': {
                    'type': 'VARCHAR(31)',
                    'allowNull': false,
                },
                'dbLogin': {
                    'type': 'VARCHAR(31)',
                    'allowNull': false,
                },
                'dbPass': {
                    'type': 'VARCHAR(31)',
                    'allowNull': false,
                },
                'active': {
                    'type': 'BOOLEAN',
                    'allowNull': false,
                    'defaultValue': false,
                },
                'maintenance': {
                    'type': 'BOOLEAN',
                    'allowNull': false,
                    'defaultValue': false,
                },
                'autoUpdate': {
                    'type': 'BOOLEAN',
                    'allowNull': true,
                },
                'expireDate': {
                    'type': 'DATE',
                    'allowNull': true,
                },
                'archivedAt': {
                    'type': 'TIMESTAMP WITH TIME ZONE',
                    'allowNull': true,
                },
            });
    },
    down(queryInterface, Sequelize) {
        return queryInterface.dropTable('client_db');
    },
};
