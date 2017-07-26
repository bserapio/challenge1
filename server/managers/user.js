'use strict';

const db = require('../db/models');
const utils = require('../utils/index');


const createUser = data => {

    data.password = utils.generatePassword(data.password);
    data.createdAt = new Date();
    data.modifiedAt = new Date();
    return db.User.create(data);
};
const getUsers = (limit, page) => {
    let offset = limit * (page - 1);
    offset = (offset >= 0) ? offset : 0;
    return db.User.findAndCountAll({
        include: [{
            model: db.ClientMeta,
            attributes: {},
        }],
        order: [['id', 'ASC']],
        limit,
        offset,
    });
};
const detailUser = id => {
    db.User.find({
        where: {id},
        include: [{
            model: db.ClientMeta,
            attributes: {},
        }],
    });
};

const updateUser = data => {
    detailUser(data.id).then(
        user => {
            if (user) {
                data.updatedAt = new Date();
                if (Object.prototype.hasOwnProperty.call(data, 'password')) {
                    data.password = utils.generatePassword(data.password);
                }
                return db.User.update(data, {
                    where: {id: user.id},
                    returning: true,
                    plain: true,
                });
            }
            throw new Error('User does not exists', 404);
        });
};
module.exports = {
    createUser, getUsers, detailUser, updateUser,
};
