'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.bulkInsert(
            { tableName: 'users', schema: 'public' },
            [{
                name: 'bserapio',
                password:'pepe',
                role:'super',
                username:'test123',
                created_at: new Date(),
                modified_at: new Date()
            }],
            {}
        );
    },

    down: function (queryInterface, Sequelize) {

    }
};