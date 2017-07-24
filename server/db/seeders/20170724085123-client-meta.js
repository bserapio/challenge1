'use strict';

const bcrypt = require('bcrypt-nodejs');
const moment = require('moment');

module.exports = {
    up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert(
            {tableName: 'client_meta', schema: 'public'},
            [{
                id: 1,
                client_id: 1,
                user_id: 1,
                created_at: new Date(),
                modified_at: new Date(),

                type: 'demo',
            },
                {
                    id: 2,
                    client_id: 2,
                    user_id: 1,
                    created_at: new Date(),
                    modified_at: new Date(),
                    type: 'edu',
                },
                {
                    id: 3,
                    client_id: 3,
                    user_id: 2,
                    created_at: new Date(),
                    modified_at: new Date(),
                    type: 'client',
                },
                {
                    id: 4,
                    client_id: 4,
                    user_id: 1,
                    created_at: new Date(),
                    modified_at: new Date(),
                    type: 'dev',
                },
                {
                    id: 5,
                    client_id: 5,
                    user_id: 1,
                    created_at: new Date(),
                    modified_at: new Date(),
                    type: 'closed',
                },
                {
                    id: 6,
                    client_id: 6,
                    user_id: 1,
                    created_at: new Date(),
                    modified_at: new Date(),
                    type: 'demo',
                },
                {
                    id: 7,
                    client_id: 7,
                    user_id: 1,
                    created_at: new Date(),
                    modified_at: new Date(),
                    type: 'demo',
                },

                {
                    id: 8,
                    client_id: 8,
                    user_id: 1,
                    created_at: new Date(),
                    modified_at: new Date(),
                    type: 'edu',
                },

                {
                    id: 9,
                    client_id: 9,
                    user_id: 1,
                    created_at: new Date(),
                    modified_at: new Date(),
                    type: 'client',
                },

                {
                    id: 10,
                    client_id: 10,
                    user_id: 1,
                    created_at: new Date(),
                    modified_at: new Date(),
                    type: 'dev',
                },

                {
                    id: 11,
                    client_id: 11,
                    user_id: 1,
                    created_at: new Date(),
                    modified_at: new Date(),
                    type: 'demo',
                },

                {
                    id: 12,
                    client_id: 12,
                    user_id: 1,
                    created_at: new Date(),
                    modified_at: new Date(),
                    type: 'dev',
                },

                {
                    id: 13,
                    client_id: 13,
                    user_id: 1,
                    created_at: new Date(),
                    modified_at: new Date(),
                    type: 'demo',
                },

                {
                    id: 14,
                    client_id: 14,
                    user_id: 1,
                    created_at: new Date(),
                    modified_at: new Date(),
                    type: 'demo',
                },

                {
                    id: 15,
                    client_id: 15,
                    user_id: 1,
                    created_at: new Date(),
                    modified_at: new Date(),
                    type: 'demo',
                },

                {
                    id: 16,
                    client_id: 16,
                    user_id: 1,
                    created_at: new Date(),
                    modified_at: new Date(),
                    type: 'demo',
                },

                {
                    id: 17,
                    client_id: 17,
                    user_id: 1,
                    created_at: new Date(),
                    modified_at: new Date(),
                    type: 'demo',
                },

                {
                    id: 18,
                    client_id: 18,
                    user_id: 1,
                    created_at: new Date(),
                    modified_at: new Date(),
                    type: 'demo',
                },

                {
                    id: 19,
                    client_id: 19,
                    user_id: 1,
                    created_at: new Date(),
                    modified_at: new Date(),
                    type: 'demo',
                },


            ],
            {}
        );
    },

    down(queryInterface, Sequelize) {

    },
};
