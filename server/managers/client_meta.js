'use strict';

const db = require('../db/models');
const utils = require('../utils/index');


const listMeta = (id, limit, page) => {
    let offset = limit * (page - 1);
    limit = (limit > 0) ? limit : 10;
    offset = (offset >= 0) ? offset : 0;

    return db.ClientMeta.findAndCountAll({
        where: {
            userId: id,
        },
        order: [['id', 'ASC']],
        include: [{
            model: db.ClientDb,
            attributes: {},
        }],
        limit,
        offset,
    });
};

const detailMeta = id => db.ClientMeta.findOne({
    where: {id},
    include: [
        {model: db.ClientDb, attributes: {}},
        {model: db.User, attributes: {}},
    ],
});
const updateMeta = (id, data) => {

    db.ClientMeta.findById(id)
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
}

module.exports = {
    listMeta, detailMeta, updateMeta
};
