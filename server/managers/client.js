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
    .then(client => client, error => error)
    .catch(error => {
        throw error;
    });

const deleteClient = id => detailClient(id).then(
    client => {
        if (client) {
            return client.destroy();
        }
        throw new Error('Client does not exists', 404);
    },
    error => error
)
    .catch(error => error);

const updateClient = (id, data) => db.ClientDb.findById(id)
    .then(
        client => {
            if (client) {
                return client.update(data);
            }
            throw new Error('Client does not exists', 404);
        },
        error => error
    )
    .catch(error => error);


const fullUpdate = (id, data) => {
    let element = {};
    element.name = data.name;
    element.lang = data.lang;
    element.expireDate = data.expireDate;
    element.modifiedAt = new Date();
    return updateClient(id, element).then(
        client => {
            element = {};
            element.user_id = data.ClientMetum.user_id;
            element.type = data.ClientMetum.type;
            console.log(element);
            db.ClientMeta.update(element, {where: {client_id: client.id}})
                .then(
                    meta => meta,
                    error => error
                );
        },
        error => error
    ).catch(error => {
        throw error;
    });
};


module.exports = {
    createClient, listClient, updateClient, detailClient, deleteClient, fullUpdate,
};
