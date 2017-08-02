'use strict';

const t = require('tcomb-validation');
const domain = require('../validator');
const userManager = require('../managers/user');
const clientMetaManager = require('../managers/client_meta');


const performUserUpdate = (id, element, input) => {
    const result = t.validate(input, domain.CreateUpdateDbInput);
    if (result.isValid()) {
        element.id = id
        return userManager.updateUser(element);
    }
    throw result.errors;
};


exports.addUser = (req, res) => {
    const input = req.body;
    const result = t.validate(input, domain.CreateInput);
    if (result.isValid()) {
        userManager.createUser(input)
            .then(
                response => res.json(response),
                error => res.status(400).json(error)
            )
            .catch(
                error => res.status(500).json(error)
            );
    } else {
        res.status(400).json(result.errors);
    }
};
exports.listUser = (req, res) => {
    userManager.getUsers()
        .then(
            result => res.json(result),
            error => res.status(400).json(error)
        )
        .catch(error => res.status(500).json(error));
};
exports.detailUser = (req, res) => {
    userManager.detailUser
        .then(
            user => res.json(user),
            err => res.status(400).json(err)
        )
        .catch(
            error => res.status(500).json(error)
        );
};

exports.clientListUser = (req, res) => {
    const limit = req.param('limit');
    const page = req.param('page', 1);

    clientMetaManager.listMeta(req.user.id, limit, page)
        .then(
            result => res.json(result),
            error => res.status(400).json(error))
        .catch(
            error => res.status(500).json(error)
        );
};
exports.clientDetailUser = (req, res) => {
    clientMetaManager.detailMeta(req.params.idMeta).then(result => {
        res.json(result);
    });
};

exports.updateUser = (req, res) => {
    const input = req.body;
    return performUserUpdate(req.params.id, input, input).then(
        result => res.json(result),
        error => res.status(400).json(error)
    )
        .catch(
            error => res.status(500).json(error)
        );
};



exports.activateUser = (req, res) => {
    const input = req.body;
    const element = {};
    element.isActive = input.isActive;
    return performUserUpdate(req.params.id, element, input).then(
        result => res.json(result),
        error => res.status(400).json(error)
    )
        .catch(
            error => res.status(500).json(error)
        );
};
exports.deleteUser = (req, res) => {
    const input = req.body;
    const element = {};
    element.deletedAt = new Date();
    return performUserUpdate(req.params.id, element, input).then(
        result => res.json(result),
        error => res.status(400).json(error)
    )
        .catch(
            error => res.status(500).json(error)
        );
};
