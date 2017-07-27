'use strict';

const t = require('tcomb-validation');
const domain = require('../validator');
const db = require('../db/models');
const clientManager = require('../managers/client');
const clientMetaManager = require('../managers/client_meta');

const performClientUpdate = (id, element, input) => {
    const result = t.validate(input, domain.CreateUpdateDbInput);
    if (result.isValid()) {
        return clientManager.updateClient(id, element);
    }
    throw result.errors;
};

const performClientMetaUpdate = (id, element, input) => {
    const result = t.validate(input, domain.CreateUpdateDbInput);
    if (result.isValid()) {
        return clientMetaManager.updateMeta(id, element);
    }
    throw result.errors;
};


exports.addClient = (req, res) => {
    const input = req.body;
    const result = t.validate(input, domain.CreateDbInput);
    if (!result.isValid()) {
        res.status(400).json(result.errors);
    } else {
        clientManager.createClient(req.user, input)
            .then(
                client => res.json(client),
                error => res.status(400).json(error)
            )
            .catch(
                error => res.status(500).json(error)
            );
    }
};

exports.listClient = (req, res) => {
    clientManager.listClient()
        .then(
            client => res.json(client),
            error => res.status(400).json(error)
        )
        .catch(
            error => res.status(500).json(error)
        );
};

exports.detailClient = (req, res) => {
    clientManager.detailClient(req.params.id).then().catch();
};

exports.removeClient = (req, res) => {
    clientManager.deleteClient(req.params.id).then().catch();
};


exports.activateClient = (req, res) => {
    const input = req.body;
    const element = {};
    element.active = input.active;
    return performClientUpdate(req.params.id, element, input).then(
        result => res.json(result),
        error => res.status(400).json(error)
    )
        .catch(
            error => res.status(500).json(error)
        );
};


exports.manteinanceClient = (req, res) => {
    const input = req.body;
    const element = {};
    element.maintenance = input.maintenance;
    return performClientUpdate(req.params.id, element, input).then(
        result => res.json(result),
        error => res.status(400).json(error)
    )
        .catch(
            error => res.status(500).json(error)
        );
};


exports.autoUpdateClient = (req, res) => {
    const input = req.body;
    const element = {};
    element.autoUpdate = input.autoUpdate;
    return performClientUpdate(req.params.id, element, input).then(
        result => res.json(result),
        error => res.status(400).json(error)
    )
        .catch(
            error => res.status(500).json(error)
        );
};

exports.newInvoiceClient = (req, res) => {
    const input = req.body;
    const element = {};
    element.newInvoice = input.ClientMetum.newInvoice;
    performClientMetaUpdate(req.params.id, element, input).then(
        result => res.json(result),
        error => res.status(400).json(error)
    )
        .catch(
            error => res.status(500).json(error)
        );
};

exports.channelClient = (req, res) => {
    const input = req.body;
    const element = {};
    element.newChannel = input.ClientMetum.newChannel;
    performClientMetaUpdate(req.params.id, element, input).then(
        result => res.json(result),
        error => res.status(400).json(error)
    )
        .catch(
            error => res.status(500).json(error)
        );
};


exports.ikentooClient = (req, res) => {
    const input = req.body;
    const element = {};
    element.ikentoo = input.ClientMetum.ikentoo;
    performClientMetaUpdate(req.params.id, element, input).then(
        result => res.json(result),
        error => res.status(400).json(error)
    )
        .catch(
            error => res.status(500).json(error)
        );
};

exports.updateClient = (req, res) => {
    const input = req.body;
    let element;
    const result = t.validate(input, domain.CreateUpdateDbInput);
    if (result.isValid()) {
        db.ClientDb.findById(req.params.id).then(client => {
            if (client) {
                element = {};
                element.name = input.name;
                element.lang = input.lang;
                element.expireDate = input.expireDate;
                element.modifiedAt = new Date();
                db.ClientDb.update(element, {
                    where: {id: client.id},
                    returning: true,
                    plain: true,
                }).then(() => {
                    element = {};
                    element.user_id = input.ClientMetum.user_id;
                    db.ClientMeta.update(element, {
                        where: { id: input.ClientMetum.id },
                    }).then(
                        meta => {
                            res.json(meta);
                        },
                        err => {
                            res.status(400).json(err);
                        }
                    )
                    ;
                });
            } else {
                res.status(404).json({ message: 'client does not exists' });
            }
        });
    } else {
        res.status(400).json(result.errors);
    }
};


exports.elevateClient = (req, res) => {
    const input = req.body;

    db.User.findOne({ where: { 'username': input.username } }).then(user => {
        if (!user) {
            res.status(404).json({ message: 'Incorrect username.' });
        } else if (!user.validPassword(input.password)) {
            res.status(403).json({ message: 'Incorrect password.' });
        } else {
            res.json({ key: 'doudfsifdkjasvgdasjhgdasgk' });
        }
        // TODO: Here I need call API for elevate Token
    });
};

