'use strict';

const selectors = require('../../config/selectors');
const acl = require('../acl/acl');

exports.getLanguages = (req, res) => {
    res.json(selectors.languages);
};

exports.getRoles = (req, res) => {
    res.json(selectors.roles);
};

exports.getTypes = (req, res) => {
    res.json(selectors.types);
};

exports.getAcl = (req, res) => {
    res.json(acl);
};
exports.getConfig = (req, res) => {
    const config = {
        lang: selectors.languages,
        roles: selectors.roles,
        types: selectors.types,
        acl,

    };


    res.json(config);
};
