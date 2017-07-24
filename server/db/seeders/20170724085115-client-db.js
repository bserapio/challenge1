'use strict';

const bcrypt = require('bcrypt-nodejs');
const moment = require('moment');

module.exports = {
    up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert(
            {tableName: 'client_db', schema: 'public'},
            [{
                id: 1,
                identifier: 'hotel1',
                name: 'hotel1',
                lang: 'en',
                db_name: 'client_hotel1',
                db_login: 'b7_hotel1',
                db_pass: 'test123',
                expire_date: moment().add(30, 'days').format(),
            },
                {
                    id: 2,
                    identifier: 'hotel2',
                    name: 'hotel2',
                    lang: 'en',
                    db_name: 'client_hotel2',
                    db_login: 'b7_hotel2',
                    db_pass: 'test123',
                    expire_date: moment().add(30, 'days').format(),
                },
                {
                    id: 3,
                    identifier: 'hotel3',
                    name: 'hotel3',
                    lang: 'en',
                    db_name: 'client_hotel3',
                    db_login: 'b7_hotel3',
                    db_pass: 'test123',
                    expire_date: moment().add(30, 'days').format(),
                },
                {
                    id: 4,
                    identifier: 'hotel4',
                    name: 'hotel4',
                    lang: 'en',
                    db_name: 'client_hotel4',
                    db_login: 'b7_hotel4',
                    db_pass: 'test123',
                    expire_date: moment().add(30, 'days').format(),
                },
                {
                    id: 5,
                    identifier: 'hotel5',
                    name: 'hotel5',
                    lang: 'en',
                    db_name: 'client_hotel5',
                    db_login: 'b7_hotel1',
                    db_pass: 'test123',
                    expire_date: moment().add(30, 'days').format(),
                },
                {
                    id: 6,
                    identifier: 'hotel6',
                    name: 'hotel6',
                    lang: 'en',
                    db_name: 'client_hotel6',
                    db_login: 'b7_hotel6',
                    db_pass: 'test123',
                    expire_date: moment().add(30, 'days').format(),
                },
                {
                    id: 7,
                    identifier: 'hotel7',
                    name: 'hotel7',
                    lang: 'en',
                    db_name: 'client_hotel7',
                    db_login: 'b7_hotel7',
                    db_pass: 'test123',
                    expire_date: moment().add(30, 'days').format(),
                },

                {
                    id: 8,
                    identifier: 'summer8',
                    name: 'summer8',
                    lang: 'en',
                    db_name: 'client_summer8',
                    db_login: 'b7_summer8',
                    db_pass: 'test123',
                    expire_date: moment().add(30, 'days').format(),
                },

                {
                    id: 9,
                    identifier: 'summer9',
                    name: 'summer9',
                    lang: 'en',
                    db_name: 'client_summer9',
                    db_login: 'b7_summer9',
                    db_pass: 'test123',
                    expire_date: moment().add(30, 'days').format(),
                },

                {
                    id: 10,
                    identifier: 'summer10',
                    name: 'summer10',
                    lang: 'en',
                    db_name: 'client_summer10',
                    db_login: 'b7_summer10',
                    db_pass: 'test123',
                    expire_date: moment().add(30, 'days').format(),
                },

                {
                    id: 11,
                    identifier: 'summer11',
                    name: 'summer11',
                    lang: 'en',
                    db_name: 'client_summer11',
                    db_login: 'b7_summer11',
                    db_pass: 'test123',
                    expire_date: moment().add(30, 'days').format(),
                },

                {
                    id: 12,
                    identifier: 'summer12',
                    name: 'summer12',
                    lang: 'en',
                    db_name: 'client_summer12',
                    db_login: 'b7_summer12',
                    db_pass: 'test123',
                    expire_date: moment().add(30, 'days').format(),
                },

                {
                    id: 13,
                    identifier: 'summer13',
                    name: 'summer13',
                    lang: 'en',
                    db_name: 'client_summer13',
                    db_login: 'b7_summer13',
                    db_pass: 'test123',
                    expire_date: moment().add(30, 'days').format(),
                },

                {
                    id: 14,
                    identifier: 'summer14',
                    name: 'summer14',
                    lang: 'en',
                    db_name: 'client_summer14',
                    db_login: 'b7_summer14',
                    db_pass: 'test123',
                    expire_date: moment().add(30, 'days').format(),
                },

                {
                    id: 15,
                    identifier: 'summer15',
                    name: 'summer15',
                    lang: 'en',
                    db_name: 'client_summer15',
                    db_login: 'b7_summer15',
                    db_pass: 'test123',
                    expire_date: moment().add(30, 'days').format(),
                },

                {
                    id: 16,
                    identifier: 'summer16',
                    name: 'summer16',
                    lang: 'en',
                    db_name: 'client_summer16',
                    db_login: 'b7_summer16',
                    db_pass: 'test123',
                    expire_date: moment().add(30, 'days').format(),
                },

                {
                    id: 17,
                    identifier: 'summer17',
                    name: 'summer17',
                    lang: 'en',
                    db_name: 'client_summer17',
                    db_login: 'b7_summer17',
                    db_pass: 'test123',
                    expire_date: moment().add(30, 'days').format(),
                },

                {
                    id: 18,
                    identifier: 'summer18',
                    name: 'summer18',
                    lang: 'en',
                    db_name: 'client_summer18',
                    db_login: 'b7_summer18',
                    db_pass: 'test123',
                    expire_date: moment().add(30, 'days').format(),
                },

                {
                    id: 19,
                    identifier: 'summer19',
                    name: 'summer19',
                    lang: 'en',
                    db_name: 'client_summer19',
                    db_login: 'b7_summer19',
                    db_pass: 'test123',
                    expire_date: moment().add(30, 'days').format(),
                },


            ],
            {}
        );
    },

    down(queryInterface, Sequelize) {

    },
};
