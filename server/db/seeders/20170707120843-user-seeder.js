'use strict';

const bcrypt = require('bcrypt-nodejs');
module.exports = {
    up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert(
            { tableName: 'users', schema: 'public' },
            [{
                name: 'admin',
                password: bcrypt.hashSync('admin123'),
                role: 'super',
                username: 'admin',
                created_at: new Date(),
                modified_at: new Date(),
            }],
            {}
        );
    },

    down(queryInterface, Sequelize) {

    },
};
