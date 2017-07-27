'use strict';

const db = require('../db/models');
const utils = require('../utils/index');
const moment = require('moment');

const createClient = (user, data) => {
    data.autoUpdate = true;
    data.dbName = `client_${data.identifier}`;
    data.dbLogin = `b7_${data.identifier}`;
    data.active = true;
    data.expireDate = moment().add(30, 'days').format();
    if (!(data.dbPass)) {
        data.dbPass = utils.randomPassword(20);
    }
    return db.ClientDb.create(data)
        .then(
            client => {
                const inputMeta = {
                    clientId: client.id,
                    userId: user.id,
                    type: data.type,
                    createdAt: new Date(),
                    modifiedAt: new Date(),

                };
                return db.ClientMeta.create(inputMeta);
            },
            error => {
                throw new Error(error);
            }
        );
};

const listClient = () => db.ClientDb.findAndCountAll({
    include: [{
        model: db.ClientMeta,
        include: [db.User],
        attributes: {},

    }],
    order: [['id', 'ASC']],
});

const detailClient = id => db.ClientDb.findById(id)
    .then(client, error)
    .catch(error => {
        throw error;
    });

const deleteClient = id => {
    return detailClient(id).then(client => client.destroy(),
        error => {
        }).catch(error => {
        throw error;
    });
};


const updateClient = (id, data) => db.ClientDb.findById(id)
    .then(
        client => {
            if (client) {
                client.update(data);
            } else {
                throw new Error('Client does not exists', 404);
            }
        },
        error => error
    )
    .catch(error => error);


module.exports = {
    createClient, listClient, updateClient, detailClient, deleteClient
};
