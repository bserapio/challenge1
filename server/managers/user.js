'use strict';

const utils = require('../utils/index');
const dbApiService  = require('../db/dbApiService');

const createUser = async data => {
    try {
        const dataProvider = await dbApiService.getDataProvider('pool_name', 'schema_name');
        data.password = utils.generatePassword(data.password);
        data.createdAt = new Date();
        data.modifiedAt = new Date();
        return await dataProvider.createAndSave('users', data);
    } catch (err) {
        throw err;
    }
};

const getUsers = async () => {
    const dataProvider = await dbApiService.getDataProvider('pool_name', 'schema_name');
    try {
        const query = { where: { deleted_at: { '$type': 'eq', '$value': null } },
            order: [['id', 'ASC']] };


        return await dataProvider.fetchAll('users', query);
    } catch (err) {
        throw err;
    }
};


const getUserByUsername = async username => {
    const dataProvider = await dbApiService.getDataProvider('pool_name', 'schema_name');
    try {
        const query = { where: { username: { '$type': 'eq', '$value': username }, deleted_at: { '$type': 'eq', '$value': null } } };
        return await dataProvider.fetchAll('users', query);
    } catch (err) {
        throw err;
    }
};


const detailUser = async id => {
    const dataProvider = await dbApiService.getDataProvider('pool_name', 'schema_name');

    try {
        return await dataProvider.fetchOne('users', parseInt(id, 10));
    } catch (err) {
        throw err;
    }
};


const checkUsername  = async username => {
    const dataProvider = await dbApiService.getDataProvider('pool_name', 'schema_name');

    try {
        const query = { where: { username: { '$type': 'eq', '$value': username } },
            order: [['id', 'ASC']] };
        return await dataProvider.fetchAll('users', query);
    } catch (err) {
        throw err;
    }
};

const updateUser = async data => {
    const dataProvider = await dbApiService.getDataProvider('pool_name', 'schema_name');
    data.updated_at = new Date();
    if (Object.prototype.hasOwnProperty.call(data, 'password')) {
        data.password = utils.generatePassword(data.password);
    }
    try {
        return await dataProvider.update('users', parseInt(data.id, 10), data);
    } catch (err) {
        throw err;
    }
};


module.exports = {
    createUser, getUsers, detailUser, updateUser, checkUsername,getUserByUsername
};
