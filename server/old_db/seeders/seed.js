'use strict';

const bcrypt = require('bcrypt-nodejs');
const db = require('../models/index');
const moment = require('moment');


const seedUsers = () => {
    const users =
        [

            {
                id: 1,
                name: 'super',
                password: bcrypt.hashSync('admin123'),
                role: 'super',
                username: 'super',
                createdAt: new Date(),
                modifiedAt: new Date(),
            },
            {
                id: 2,
                name: 'admin',
                password: bcrypt.hashSync('admin123'),
                role: 'admin',
                username: 'admin',
                createdAt: new Date(),
                modifiedAt: new Date(),
            },
            {
                id: 3,
                name: 'user',
                password: bcrypt.hashSync('admin123'),
                role: 'user',
                username: 'user',
                createdAt: new Date(),
                modifiedAt: new Date(),
            },
            {
                id: 4,
                name: 'finance',
                password: bcrypt.hashSync('admin123'),
                role: 'finance',
                username: 'finance',
                createdAt: new Date(),
                modifiedAt: new Date(),
            },
            {
                id: 5,
                name: 'manager',
                password: bcrypt.hashSync('admin123'),
                role: 'manager',
                username: 'manager',
                createdAt: new Date(),
                modifiedAt: new Date(),
            },
            {
                id: 6,
                name: 'sales',
                password: bcrypt.hashSync('admin123'),
                role: 'sales',
                username: 'sales',
                createdAt: new Date(),
                modifiedAt: new Date(),
            },
            {
                id: 7,
                name: 'account-manager',
                password: bcrypt.hashSync('admin123'),
                role: 'account-manager',
                username: 'account_manager',
                createdAt: new Date(),
                modifiedAt: new Date(),
            },
        ];


    return db.User.bulkCreate(users).then(() => db.sequelize.query('ALTER SEQUENCE "users_id_seq" RESTART WITH 7').then(result => result, error => error), error => {
        console.log(error);
    }
    );
};

const seedClientDb = () => {
    const ClientDb = [
        {
            id: 1,
            identifier: 'hotel1',
            name: 'hotel1',
            lang: 'en',
            dbName: 'client_hotel1',
            dbLogin: 'b7_hotel1',
            dbPass: 'test123',
            expireDate: moment().add('days', 30).format(),
        },
        {
            id: 2,
            identifier: 'hotel2',
            name: 'hotel2',
            lang: 'en',
            dbName: 'client_hotel2',
            dbLogin: 'b7_hotel2',
            dbPass: 'test123',
            expireDate: moment().add('days', 30).format(),
        },
        {
            id: 3,
            identifier: 'hotel3',
            name: 'hotel3',
            lang: 'en',
            dbName: 'client_hotel3',
            dbLogin: 'b7_hotel3',
            dbPass: 'test123',
            expireDate: moment().add('days', 30).format(),
        },
        {
            id: 4,
            identifier: 'hotel4',
            name: 'hotel4',
            lang: 'en',
            dbName: 'client_hotel4',
            dbLogin: 'b7_hotel4',
            dbPass: 'test123',
            expireDate: moment().add('days', 30).format(),
        },
        {
            id: 5,
            identifier: 'hotel5',
            name: 'hotel5',
            lang: 'en',
            dbName: 'client_hotel5',
            dbLogin: 'b7_hotel1',
            dbPass: 'test123',
            expireDate: moment().add('days', 30).format(),
        },
        {
            id: 6,
            identifier: 'hotel6',
            name: 'hotel6',
            lang: 'en',
            dbName: 'client_hotel6',
            dbLogin: 'b7_hotel6',
            dbPass: 'test123',
            expireDate: moment().add('days', 30).format(),
        },
        {
            id: 7,
            identifier: 'hotel7',
            name: 'hotel7',
            lang: 'en',
            dbName: 'client_hotel7',
            dbLogin: 'b7_hotel7',
            dbPass: 'test123',
            expireDate: moment().add('days', 30).format(),
        },

        {
            id: 8,
            identifier: 'summer8',
            name: 'summer8',
            lang: 'en',
            dbName: 'client_summer8',
            dbLogin: 'b7_summer8',
            dbPass: 'test123',
            expireDate: moment().add('days', 30).format(),
        },

        {
            id: 9,
            identifier: 'summer9',
            name: 'summer9',
            lang: 'en',
            dbName: 'client_summer9',
            dbLogin: 'b7_summer9',
            dbPass: 'test123',
            expireDate: moment().add('days', 30).format(),
        },

        {
            id: 10,
            identifier: 'summer10',
            name: 'summer10',
            lang: 'en',
            dbName: 'client_summer10',
            dbLogin: 'b7_summer10',
            dbPass: 'test123',
            expireDate: moment().add('days', 30).format(),
        },

        {
            id: 11,
            identifier: 'summer11',
            name: 'summer11',
            lang: 'en',
            dbName: 'client_summer11',
            dbLogin: 'b7_summer11',
            dbPass: 'test123',
            expireDate: moment().add('days', 30).format(),
        },

        {
            id: 12,
            identifier: 'summer12',
            name: 'summer12',
            lang: 'en',
            dbName: 'client_summer12',
            dbLogin: 'b7_summer12',
            dbPass: 'test123',
            expireDate: moment().add('days', 30).format(),
        },

        {
            id: 13,
            identifier: 'summer13',
            name: 'summer13',
            lang: 'en',
            dbName: 'client_summer13',
            dbLogin: 'b7_summer13',
            dbPass: 'test123',
            expireDate: moment().add('days', 30).format(),
        },

        {
            id: 14,
            identifier: 'summer14',
            name: 'summer14',
            lang: 'en',
            dbName: 'client_summer14',
            dbLogin: 'b7_summer14',
            dbPass: 'test123',
            expireDate: moment().add('days', 30).format(),
        },

        {
            id: 15,
            identifier: 'summer15',
            name: 'summer15',
            lang: 'en',
            dbName: 'client_summer15',
            dbLogin: 'b7_summer15',
            dbPass: 'test123',
            expireDate: moment().add('days', 30).format(),
        },

        {
            id: 16,
            identifier: 'summer16',
            name: 'summer16',
            lang: 'en',
            dbName: 'client_summer16',
            dbLogin: 'b7_summer16',
            dbPass: 'test123',
            expireDate: moment().add('days', 30).format(),
        },

        {
            id: 17,
            identifier: 'summer17',
            name: 'summer17',
            lang: 'en',
            dbName: 'client_summer17',
            dbLogin: 'b7_summer17',
            dbPass: 'test123',
            expireDate: moment().add('days', 30).format(),
        },

        {
            id: 18,
            identifier: 'summer18',
            name: 'summer18',
            lang: 'en',
            dbName: 'client_summer18',
            dbLogin: 'b7_summer18',
            dbPass: 'test123',
            expireDate: moment().add('days', 30).format(),
        },

        {
            id: 19,
            identifier: 'summer19',
            name: 'summer19',
            lang: 'en',
            dbName: 'client_summer19',
            dbLogin: 'b7_summer19',
            dbPass: 'test123',
            expireDate: moment().add('days', 30).format(),
        },


    ];
    return db.ClientDb.bulkCreate(ClientDb).then(response => db.sequelize.query(`ALTER SEQUENCE "client_db_id_seq" RESTART WITH ${ClientDb[ClientDb.length - 1].id + 1};`).then(result => result, error => error)

        , error => {
            console.log(error);
        });
};

const seedClientMeta = () => {
    const ClientMeta = [
        {
            id: 1,
            clientId: 1,
            userId: 1,
            createdAt: new Date(),
            modifiedAt: new Date(),

            type: 'demo',
        },
        {
            id: 2,
            clientId: 2,
            userId: 1,
            createdAt: new Date(),
            modifiedAt: new Date(),
            type: 'edu',
        },
        {
            id: 3,
            clientId: 3,
            userId: 2,
            createdAt: new Date(),
            modifiedAt: new Date(),
            type: 'client',
        },
        {
            id: 4,
            clientId: 4,
            userId: 1,
            createdAt: new Date(),
            modifiedAt: new Date(),
            type: 'dev',
        },
        {
            id: 5,
            clientId: 5,
            userId: 1,
            createdAt: new Date(),
            modifiedAt: new Date(),
            type: 'closed',
        },
        {
            id: 6,
            clientId: 6,
            userId: 1,
            createdAt: new Date(),
            modifiedAt: new Date(),
            type: 'demo',
        },
        {
            id: 7,
            clientId: 7,
            userId: 1,
            createdAt: new Date(),
            modifiedAt: new Date(),
            type: 'demo',
        },

        {
            id: 8,
            clientId: 8,
            userId: 1,
            createdAt: new Date(),
            modifiedAt: new Date(),
            type: 'edu',
        },

        {
            id: 9,
            clientId: 9,
            userId: 1,
            createdAt: new Date(),
            modifiedAt: new Date(),
            type: 'client',
        },

        {
            id: 10,
            clientId: 10,
            userId: 1,
            createdAt: new Date(),
            modifiedAt: new Date(),
            type: 'dev',
        },

        {
            id: 11,
            clientId: 11,
            userId: 1,
            createdAt: new Date(),
            modifiedAt: new Date(),
            type: 'demo',
        },

        {
            id: 12,
            clientId: 12,
            userId: 1,
            createdAt: new Date(),
            modifiedAt: new Date(),
            type: 'dev',
        },

        {
            id: 13,
            clientId: 13,
            userId: 1,
            createdAt: new Date(),
            modifiedAt: new Date(),
            type: 'demo',
        },

        {
            id: 14,
            clientId: 14,
            userId: 1,
            createdAt: new Date(),
            modifiedAt: new Date(),
            type: 'demo',
        },

        {
            id: 15,
            clientId: 15,
            userId: 1,
            createdAt: new Date(),
            modifiedAt: new Date(),
            type: 'demo',
        },

        {
            id: 16,
            clientId: 16,
            userId: 1,
            createdAt: new Date(),
            modifiedAt: new Date(),
            type: 'demo',
        },

        {
            id: 17,
            clientId: 17,
            userId: 1,
            createdAt: new Date(),
            modifiedAt: new Date(),
            type: 'demo',
        },

        {
            id: 18,
            clientId: 18,
            userId: 1,
            createdAt: new Date(),
            modifiedAt: new Date(),
            type: 'demo',
        },

        {
            id: 19,
            clientId: 19,
            userId: 1,
            createdAt: new Date(),
            modifiedAt: new Date(),
            type: 'demo',
        },


    ];


    return db.ClientMeta.bulkCreate(ClientMeta).then(() => db.sequelize.query(`ALTER SEQUENCE "client_meta_id_seq" RESTART WITH ${ClientMeta[ClientMeta.length - 1].id + 1};`).then(result => result, error => error)

        , error => {
            console.log(error);
        });
};


seedUsers().then(() => seedClientDb().then(() => seedClientMeta().then(() => {
    process.exit();
})));

