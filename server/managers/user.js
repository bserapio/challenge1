'use strict';

const db = require('../old_db/models');
const utils = require('../utils/index');
const dbApiService  = require('../db/dbApiService');

const createUser = data => {
    data.password = utils.generatePassword(data.password);
    data.createdAt = new Date();
    data.modifiedAt = new Date();
    return db.User.create(data);
};
const getUsers = async () => {
    const dataProvider = await dbApiService.getDataProvider('pool_name', 'schema_name');
    try {
        const query = { where: { deleted_at: null },
            order: [['id', 'ASC']] };
        return await dataProvider.fetchAll('users', query);

    } catch (err) {
        throw err;
    }
};
const detailUser = id => db.User.find({
    where: { id },
    include: [{
        model: db.ClientMeta,
        attributes: {},
    }],
});

const getUserByUserName = username => db.User.find({
    where: { username },
});


const updateUser = data => detailUser(data.id).then(
        user => {
            if (user) {
                data.updatedAt = new Date();
                if (Object.prototype.hasOwnProperty.call(data, 'password')) {
                    data.password = utils.generatePassword(data.password);
                }
                return db.User.update(data, {
                    where: { id: user.id },
                    returning: true,
                    plain: true,
                });
            }


            throw new Error('User does not exists', 404);
        });
module.exports = {
    createUser, getUsers, detailUser, updateUser, getUserByUserName,
};
