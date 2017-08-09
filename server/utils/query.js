'use strict';

const aclModel = require('../acl/index');
const _ = require('lodash');


function getWhereValue(query) {
    if (!query.where) return {};
    return query.where;
}


function getOrderValue(query) {
    if (!query.order) return [];
    return query.order;
}

function getAttributeValue(query) {
    if (!query.columns) return [];
    if (_.indexOf(query.columns, '*') !== -1) return [];
    return typeof query.columns !== 'undefined' ? query.columns : [];
}
function getWithValue(query, role, object = {}) {
    if (!query.with) return object;
    try {
        console.log(query.with);
        const object = query.with;
        const result = {};
        for (const name in object) {
            result[name] = {};
            for (const key in object[name]) {
                if (key === 'with') {
                    result[name].with = getWithValue(object[name], role, object[name]);
                } else {
                    result[name][key] = object[name][key];
                }
            }
        }
        return result;
    } catch (err) {

    }

}


const buildQuery = (query, role) => {
    const withQuery = getWithValue(query, role);
    const element = {
        attributes: getAttributeValue(query),
        with: withQuery,
        where: getWhereValue(query),
        order: getOrderValue(query),
    };

    return element;
};

module.exports = {
    buildQuery,
};
