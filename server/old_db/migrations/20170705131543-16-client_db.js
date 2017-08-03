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
                'client_id': {
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
                'db_name': {
                    'type': 'VARCHAR(31)',
                    'allowNull': false,
                },
                'db_login': {
                    'type': 'VARCHAR(31)',
                    'allowNull': false,
                },
                'db_pass': {
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
                'auto_update': {
                    'type': 'BOOLEAN',
                    'allowNull': true,
                },
                'expire_date': {
                    'type': 'DATE',
                    'allowNull': true,
                },
                'archived_at': {
                    'type': 'TIMESTAMP WITH TIME ZONE',
                    'allowNull': true,
                },
            });
    },
    down(queryInterface, Sequelize) {
        return queryInterface.dropTable('client_db');
    },
};
