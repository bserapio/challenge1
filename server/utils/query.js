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
function getWithValue(query, role) {
    try {
        if (!query.with) return {};
        console.log(query.with);
        return query.with;


    } catch (err) {
        console.log(err);
        return {}
    }

}


const buildQuery = (query, role) => {
    const withQuery = getWithValue(query, role);
    console.log(withQuery);

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

/*


const prepareClients = data => {
    const results = data;
    results.forEach((item, index) => {
        if (Object.prototype.hasOwnProperty.call(item, 'client_metas')) {
            const element = item.client_metas;
            if (element) {
                Object.keys(element).forEach(prop => {
                    if (element && Object.prototype.hasOwnProperty.call(element, prop)) {
                        if (prop === 'users') {
                            Object.keys(element[prop]).forEach(prop1 => {
                                item[`client_metas#users#${prop1}`] = element[prop][prop1];
                            });
                        } else {
                            item[`client_metas#${prop}`] = element[prop];
                        }
                    }
                });
                item.key = item.id;
                results[index] = item;
            }
        }
    });
    return results;
};
*/
