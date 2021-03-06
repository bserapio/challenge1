'use strict';


const utils = require('../utils/index');
const queryUtils = require('../utils/query');
const moment = require('moment');
const dbApiService  = require('../db/dbApiService');
const clientMeta = require('./client_meta');


const createClient = async (user, data) => {
    try {
        const dataProvider = await dbApiService.getDataProvider('pool_name', 'schema_name');
        data.autoUpdate = true;
        data.dbName = `client_${data.identifier}`;
        data.dbLogin = `b7_${data.identifier}`;
        data.active = true;
        data.expireDate = moment().add(30, 'days').format();
        if (!(data.dbPass)) {
            data.dbPass = utils.randomPassword(20);
        }
        return await dataProvider.createAndSave('clientDb', data);
    } catch (err) {
        throw err;
    }
};

const listClient = async role => {
    const dataProvider = await dbApiService.getDataProvider('pool_name', 'schema_name');
    try {
        const oldQuery = {
            'with': {
                'clientMeta': { 'columns': ['*'],
                    'with': { 'users': { 'columns': ['*'] } },
                },

            },
            order: [['id', 'ASC']],
        };

        const query = queryUtils.buildQuery(oldQuery, role);

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
        return await dataProvider.destroy('clientDb', parseInt(id, 10));
    } catch (err) {
        throw err;
    }
};

const updateClient = async (id, data) => {
    const dataProvider = await dbApiService.getDataProvider('pool_name', 'schema_name');
    try {
        return await dataProvider.update('clientDb', parseInt(id, 10), data);
    } catch (err) {
        throw err;
    }
};

const fullUpdate = async (id, data) => {
    const element = {};
    element.name = data.name;
    element.lang = data.lang;
    element.expireDate = data.expireDate;
    element.modifiedAt = new Date();
    try {
        await updateClient(id, element);
        const clientMetadata = {};
        clientMetadata.userId = data.client_metas.userId;
        clientMetadata.type = data.client_metas.type;
        return await clientMeta.updateMeta(parseInt(data.client_metas.id, 10), clientMetadata);
    } catch (err) {
        throw err;
    }
};

module.exports = {
    createClient, listClient, detailClient, deleteClient, fullUpdate, updateClient,
};
