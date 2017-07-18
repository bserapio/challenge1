'use strict';

const t = require('tcomb-validation');

const domain = require('../validator');
const db = require('../db/models');


// Display detail page for a specific Author
exports.addUser = (req, res) => {
    const input = req.body;
    const result = t.validate(input, domain.CreateInput);
    if (result.isValid()) {
        input.createdAt = new Date();
        input.modifiedAt = new Date();
        db.User.create(input).then(
            user => {
                res.json(user);
            },
            err => {
                res.status(403).json(err);
            });
    } else {
        res.status(400).json(result.errors);
    }
};
exports.listUser = (req, res) => {
    const limit = req.param('limit', null);
    const page = req.param('page', 1);
    let offset = limit * (page - 1);
    offset = (offset >= 0) ? offset : 0;
    db.User.findAndCountAll({
        include: [{
            model: db.ClientMeta,
            attributes: {},
        }],
        limit,
        offset,
    }).then(result => {
        res.json(result);
    });
};
exports.detailUser = (req, res) => {
    db.User.find({
        where: {id: req.params.id},
        include: [{
            model: db.ClientMeta,
            attributes: {},
        }],
    }).then(user => {
        res.json(user);
    });
};
exports.updateUser = (req, res) => {
    const input = req.body;
    const result = t.validate(input, domain.CreateUpdateInput);
    if (result.isValid()) {
        input.updatedAt = new Date();
        db.User.findById(req.params.id).then(user => {
            if (user) {
                db.User.update(input, {
                    where: { id: user.id },
                    returning: true,
                    plain: true,
                })
                    .then(data => {
                        res.json(data);
                    });
            } else {
                res.status(404).json({message: 'user does not exists'});
            }
        });
    } else {
        res.status(400).json(result.errors);
    }
};
exports.clientListUser = (req, res) => {
    let limit = req.param('limit', 10);
    const page = req.param('page', 1);
    let offset = limit * (page - 1);
    limit = (limit > 0) ? limit : 10;
    offset = (offset >= 0) ? offset : 0;

    db.ClientMeta.findAndCountAll({
        where: {
            userId: req.user.id,
        },
        include: [{
            model: req.model.ClientDb,
            attributes: {},
        }],
        limit,
        offset,
    }).then(result => {
        res.json(result);
    });
};
exports.clientDetailUser = (req, res) => {
    db.ClientMeta.findOne({
        where: {
            userId: req.params.id,
            id: req.params.idMeta,
        },
        include: [
            {
                model: db.ClientDb,
                attributes: {},
            },
            {
                model: req.model.User,
                attributes: {},
            },
        ],
    }).then(result => {
        res.json(result);
    });
};
exports.clientUpdateDetailUser = (req, res) => {
    const input = req.body;
    const result = t.validate(input, domain.CreateUpdateMetaDbInput);
    if (result.isValid()) {
        const clientMetaModel = req.model.ClientMeta;
        db.ClientMeta.findOne({
            where: {
                userId: req.params.id,
                id: req.params.idMeta,
            },
        }).then(client => {
            if (client) {
                clientMetaModel.update(input, {
                    where: { id: client.id },
                    returning: true,
                    plain: true,
                })
                    .then(data => {
                        res.json(data);
                    });
            } else {
                res.status(404);
            }
        });
    } else {
        res.status(400).json(result.errors);
    }
};
