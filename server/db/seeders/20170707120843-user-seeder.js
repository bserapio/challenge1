'use strict';

const bcrypt = require('bcrypt-nodejs');

module.exports = {
    up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert(
            { tableName: 'users', schema: 'public' },
            [{
                name: 'super',
                password: bcrypt.hashSync('admin123'),
                role: 'super',
                username: 'super',
                created_at: new Date(),
                modified_at: new Date(),
            },
            {
                name: 'admin',
                password: bcrypt.hashSync('admin123'),
                role: 'admin',
                username: 'admin',
                created_at: new Date(),
                modified_at: new Date(),
            },
            {
                name: 'user',
                password: bcrypt.hashSync('admin123'),
                role: 'user',
                username: 'user',
                created_at: new Date(),
                modified_at: new Date(),
            },
            {
                name: 'finance',
                password: bcrypt.hashSync('admin123'),
                role: 'finance',
                username: 'finance',
                created_at: new Date(),
                modified_at: new Date(),
            },
            {
                name: 'manager',
                password: bcrypt.hashSync('admin123'),
                role: 'manager',
                username: 'manager',
                created_at: new Date(),
                modified_at: new Date(),
            },
            {
                name: 'sales',
                password: bcrypt.hashSync('admin123'),
                role: 'sales',
                username: 'sales',
                created_at: new Date(),
                modified_at: new Date(),
            },
            {
                name: 'account-manager',
                password: bcrypt.hashSync('admin123'),
                role: 'account-manager',
                username: 'amanager',
                created_at: new Date(),
                modified_at: new Date(),
            },


            ],
            {}
        );
    },

    down(queryInterface, Sequelize) {

    },
};
