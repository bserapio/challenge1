'use strict';

const db = require('../old_db/models');
const utils = require('../utils/index');
const moment = require('moment');
const dbApiService  = require('../db/dbApiService');

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

const listClient = async () => {
    const dataProvider = await dbApiService.getDataProvider('pool_name', 'schema_name');

    try {
        const query = {
            'with': { 'client_metas': { 'columns': [] } },
        };
        return await dataProvider.fetchAll('clientDb', query);
    } catch (err) {
        throw err;
    }
};

const detailClient = async id => {
    const dataProvider = await dbApiService.getDataProvider('pool_name', 'schema_name');

    try {
        const query = {
            where: { id: `${id}` },
            'with': { 'client_metas': { 'columns': [] } },
        };


        return await dataProvider.fetchAll('clientDb', query);
    } catch (err) {
        throw err;
    }
};

const deleteClient = async id => {
    const dataProvider = await dbApiService.getDataProvider('pool_name', 'schema_name');
    try {
        return await dataProvider.destroy('clientDb', parseInt(id));
    } catch (err) {
        throw err;
    }
};
const updateClient = async (id, data) => {
    const dataProvider = await dbApiService.getDataProvider('pool_name', 'schema_name');
    try {
        return await dataProvider.update('clientDb', parseInt(id),data);
    } catch (err) {
        throw err;
    }
};


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
            db.ClientMeta.update(element, { where: { client_id: client.id } })
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
    createClient, listClient, detailClient, deleteClient, fullUpdate, updateClient,
};
