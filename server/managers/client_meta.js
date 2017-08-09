'use strict';

const dbApiService  = require('../db/dbApiService');


const updateMeta = async (id, data) => {
    try {
        const dataProvider = await dbApiService.getDataProvider('pool_name', 'schema_name');
        console.log(data);
        const result =  await dataProvider.update('clientMeta', parseInt(id, 10), data);
        return result;
    } catch (err) {
        throw err;
    }
};

module.exports = {
    updateMeta,
};
