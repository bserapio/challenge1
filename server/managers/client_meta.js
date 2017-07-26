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


module.exports = {
    listMeta, detailMeta,
};
