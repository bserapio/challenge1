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
                'clientId': {
                    'type': 'INTEGER',
                    'allowNull': false,
                },
                'userId': {
                    'type': 'INTEGER',
                    'allowNull': false,
                },
                'type': {
                    'type': 'VARCHAR(255)',
                    'allowNull': false,
                },
                'newInvoice': {
                    'type': 'BOOLEAN',
                    'allowNull': false,
                    'defaultValue': true,
                },
                'newChannel': {
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
                'channelManager': {
                    'type': 'BOOLEAN',
                    'allowNull': false,
                    'defaultValue': false,
                },
                'createdAt': {
                    'type': 'TIMESTAMP WITH TIME ZONE',
                    'allowNull': false,
                },
                'modifiedAt': {
                    'type': 'TIMESTAMP WITH TIME ZONE',
                    'allowNull': false,
                },
                'lastLogin': {
                    'type': 'TIMESTAMP WITH TIME ZONE',
                    'allowNull': true,
                },
            });
    },
    down(queryInterface, Sequelize) {
        return queryInterface.dropTable('client_meta');
    },
};
