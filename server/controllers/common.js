'use strict';

const selectors = require('../../config/selectors');

exports.getLanguages = (req, res) => {
    res.json(selectors.languages);
};

exports.getRoles = (req, res) => {
    res.json(selectors.roles);
};

exports.getTypes = (req, res) => {
    res.json(selectors.types);
};
