'use strict';

module.exports = {
    up(queryInterface, Sequelize) {
        return queryInterface.createTable('client_meta',
            {
                'id': {
                    'type': 'INTEGER',
                    'allowNull': false,
                    'primaryKey': true,
                    'autoIncrement': true,
                },
                'client_id': {
                    'type': 'INTEGER',
                    'allowNull': false,
                },
                'user_id': {
                    'type': 'INTEGER',
                    'allowNull': false,
                },
                'type': {
                    'type': 'VARCHAR(255)',
                    'allowNull': false,
                },
                'new_invoice': {
                    'type': 'BOOLEAN',
                    'allowNull': false,
                    'defaultValue': true,
                },
                'new_channel': {
                    'type': 'BOOLEAN',
                    'allowNull': false,
                    'defaultValue': true,
                },
                'cubilis': {
                    'type': 'BOOLEAN',
                    'allowNull': false,
                    'defaultValue': false,
                },
                'ikentoo': {
                    'type': 'BOOLEAN',
                    'allowNull': false,
                    'defaultValue': false,
                },
                'seekda': {
                    'type': 'BOOLEAN',
                    'allowNull': false,
                    'defaultValue': false,
                },
                'channel_manager': {
                    'type': 'BOOLEAN',
                    'allowNull': false,
                    'defaultValue': false,
                },
                'created_at': {
                    'type': 'TIMESTAMP WITH TIME ZONE',
                    'allowNull': false,
                },
                'modified_at': {
                    'type': 'TIMESTAMP WITH TIME ZONE',
                    'allowNull': false,
                },
                'last_login': {
                    'type': 'TIMESTAMP WITH TIME ZONE',
                    'allowNull': true,
                },
            });
    },
    down(queryInterface, Sequelize) {
        return queryInterface.dropTable('client_meta');
    },
};
