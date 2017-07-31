'use strict';

const t = require('tcomb-validation');
const domain = require('../validator');
const userManager = require('../managers/user');
const clientMetaManager = require('../managers/client_meta');

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
exports.updateUser = (req, res) => {
    const input = req.body;
    const result = t.validate(input, domain.CreateUpdateInput);
    if (result.isValid()) {
        userManager.updateUser
            .then(
                user => res.json(user),
                error => res.status(400).json(error)
            )
            .catch(
                error => {
                    if (error.id === 404) {
                        return res.status(404).json({message: error.message});
                    }
                    return res.status(500).json({message: 'kk'});
                });
    } else {
        res.status(400).json(result.errors);
    }
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
