'use strict';

const t = require('tcomb-validation');
const domain = require('../validator');
const randomstring = require('randomstring');
const db = require('../db/models');
const moment = require('moment');


exports.addClient = (req, res) => {
    const input = req.body;
    let result = t.validate(input, domain.CreateDbInput);
    if (!result.isValid()) {
        res.status(400).json(result.errors);
    } else {
        input.autoUpdate = true;
        input.dbName = `client_${input.identifier}`;
        input.dbLogin = `b7_${input.identifier}`;
        input.active = true;
        input.expireDate = moment().add(30, 'days').format();
        if (!(input.dbPass)) {
            input.dbPass = randomstring.generate(20);
        }
        db.ClientDb.create(input).then(
            clientdb => {
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
                        res.json(400).json({ message: 'Error Creating clientMeta' });
                    }
                });
            },
            err => {
                res.status(403).json(err);
            }
        );
    }
};

exports.listClient = (req, res) => {
    db.ClientDb.findAndCountAll({
        include: [{
            model: db.ClientMeta,
            include: [db.User],
            attributes: {},

        }],
        order: [['id', 'ASC']],
    }).then(result => {
        res.json(result);
    });
};

exports.detailClient = (req, res) => {
    db.ClientDb.findById(req.params.id).then(user => {
        res.json(user);
    });
};

exports.removeClient = (req, res) => {
    db.ClientDb.find({ where: { 'id': req.params.id } }).then(client => {
        if (client) {
            db.ClientMeta.find({ where: { 'client_id': client.id } }).then(
                    cmeta => {
                        if (cmeta) {
                            cmeta.destroy();
                        }
                    }
                );
            client.destroy().then(
                    () => {
                        res.status(204).json({ message: 'Client Deleted' });
                    }
                );
        } else {
            res.status(404).json({ message: 'client does not exists' });
        }
    }, err => {
        res.status(400).json({ err });
    }
    );
};


exports.activateClient = (req, res) => {
    const input = req.body;
    let element;
    const result = t.validate(input, domain.CreateUpdateDbInput);
    if (result.isValid()) {
        db.ClientDb.findById(req.params.id).then(client => {
            if (client) {
                element = {};
                element.active = input.active;
                db.ClientDb.update(element, {
                    where: { id: client.id },
                    returning: true,
                    plain: true,
                }).then(data => {
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

exports.manteinanceClient = (req, res) => {
    const input = req.body;
    let element;
    const result = t.validate(input, domain.CreateUpdateDbInput);
    if (result.isValid()) {
        db.ClientDb.findById(req.params.id).then(client => {
            if (client) {
                element = {};
                element.maintenance = input.maintenance;
                db.ClientDb.update(element, {
                    where: {id: client.id},
                    returning: true,
                    plain: true,
                }).then(data => {
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

exports.autoUpdateClient = (req, res) => {
    const input = req.body;
    let element;
    const result = t.validate(input, domain.CreateUpdateDbInput);
    if (result.isValid()) {
        db.ClientDb.findById(req.params.id).then(client => {
            if (client) {
                element = {};
                element.autoUpdate = input.autoUpdate;
                db.ClientDb.update(element, {
                    where: {id: client.id},
                    returning: true,
                    plain: true,
                }).then(data => {
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

exports.newInvoiceClient = (req, res) => {
    const input = req.body;
    let element;
    const result = t.validate(input, domain.CreateUpdateDbInput);
    if (result.isValid()) {
        db.ClientMeta.find({where: {client_id: req.params.id}}).then(meta => {
            if (meta) {
                element = {};
                element.newInvoice = input.ClientMetum.newInvoice;
                db.ClientMeta.update(element, {
                    where: {id: meta.id},
                    returning: true,
                    plain: true,
                }).then(data => {
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

exports.channelClient = (req, res) => {
    const input = req.body;
    let element;
    const result = t.validate(input, domain.CreateUpdateDbInput);
    if (result.isValid()) {
        db.ClientMeta.find({where: {client_id: req.params.id}}).then(meta => {
            if (meta) {
                element = {};
                element.newChannel = input.ClientMetum.newChannel;
                db.ClientMeta.update(element, {
                    where: {id: meta.id},
                    returning: true,
                    plain: true,
                }).then(data => {
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


exports.ikentooClient = (req, res) => {
    const input = req.body;
    let element;
    const result = t.validate(input, domain.CreateUpdateDbInput);
    if (result.isValid()) {
        db.ClientMeta.find({where: {client_id: req.params.id}}).then(meta => {
            if (meta) {
                element = {};
                element.ikentoo = input.ClientMetum.ikentoo;
                db.ClientMeta.update(element, {
                    where: {id: meta.id},
                    returning: true,
                    plain: true,
                }).then(data => {
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

