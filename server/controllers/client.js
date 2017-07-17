'use strict';

const t = require('tcomb-validation');
const domain = require('../validator');
const moment = require('moment');
const randomstring = require('randomstring');
const db = require('../db/models');


exports.addClient = function (req, res) {
    const input = req.body;
    let result = t.validate(input, domain.CreateDbInput);
    if (result.isValid()) {
        input.autoUpdate = true;
        input.dbName = `client_${input.identifier}`;
        input.dbLogin = `b7_${input.identifier}`;
        input.active = true;
        if (!(input.dbPass)) {
            input.dbPass = randomstring.generate(20);
        }
        db.ClientDb.create(input).then(clientdb => {
            const clientMeta = {
                clientId: clientdb.id,
                userId: req.user.id,
                type: input.type,
                createdAt: new Date(),
                modifiedAt: new Date(),
            };
            db.ClientMeta.create(clientMeta).then(clientmeta => {
                if (clientmeta) {
                    result = {
                        client: clientdb,
                        meta: clientmeta,
                    };
                    res.json(result);
                } else {
                    res.json(400).json({message: 'Error Creating clientMeta'});
                }
            });
        });
    } else {
        res.status(400).json(result.errors);
    }
};

exports.listClient = function (req, res) {
    db.ClientDb.findAndCountAll({
        include: [{
            model: db.ClientMeta,
            attributes: {},
        }],
    }).then(result => {
        res.json(result);
    });
};

exports.detailClient = function (req, res) {
    db.ClientDb.findById(req.params.id).then(user => {
        res.json(user);
    });
};

exports.removeClient = function (req, res) {
    db.ClientDb.findById(req.params.id).then(client => {
        db.ClientMeta.find({where: {'client_id': client.id}}).then(
            cmeta => {
                cmeta.destroy().then(() => {
                    client.destroy().then(() => {
                        res.status(204).json({message: 'Client Deleted'});
                    });
                });
            });
    });
};

exports.updateClient = function (req, res) {
    const input = req.body;
    const result = t.validate(input, domain.CreateUpdateDbInput);
    if (result.isValid()) {
        db.ClientDb.findById(req.params.id).then(client => {
            if (client) {
                input.autoUpdate = true;
                input.dbName = `client_${input.identifier}`;
                input.dbLogin = `b7_${input.identifier}`;
                input.active = true;
                db.ClientDb.update(input, {
                    where: { id: client.id },
                    returning: true,
                    plain: true,
                })
                    .then(data => {
                        /**
                         * We put all the info that we need for the client_meta
                         *
                         */


                        res.json(data);
                    });
            } else {
                res.status(404).json({message: 'client does not exists'});
            }
        });
    } else {
        res.status(400).json(result.errors);
    }
};

exports.elevateClient = function (req, res) {
    const input = req.body;

    db.User.findOne({where: {'username': input.username}}).then(user => {
        if (!user) {
            res.status(404).json({message: 'Incorrect username.'});
        } else if (!user.validPassword(input.password)) {
            res.status(404).json({message: 'Incorrect password.'});
        } else {
            res.json({key: 'doudfsifdkjasvgdasjhgdasgk'});
        }
        // Here I need call request function and return the correct key
    });
};
