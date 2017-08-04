'use strict';

const db = require('../old_db/models');
const dbApiService  = require('../db/dbApiService');

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
    where: { id },
    include: [
        { model: db.ClientDb, attributes: {} },
        { model: db.User, attributes: {} },
    ],
});
const updateMeta = async (id, data) => {
    try {
        const dataProvider = await dbApiService.getDataProvider('pool_name', 'schema_name');
        return await dataProvider.update('clientMeta', parseInt(id, 10), data);
    } catch (err) {
        throw err;
    }
};

module.exports = {
    listMeta, detailMeta, updateMeta,
};
