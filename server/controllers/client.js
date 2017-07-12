const t = require('tcomb-validation');
const validate = t.validate;
const domain = require('../validator');
const moment = require('moment');
const randomstring = require('randomstring');


exports.addClient = function (req, res) {
    const clientDbModel = req.model.ClientDb;
    const clientMetaModel = req.model.ClientMeta;
    const input = req.body;
    let result = t.validate(input, domain.CreateDbInput);
    if (result.isValid()) {
        input.autoUpdate = true;
        input.dbName = `client_${input.identifier}`;
        input.dbLogin = `b7_${input.identifier}`;
        input.active = true;
        if (!(input.hasOwnProperty('dbPass'))) {
            input.dbPass = randomstring.generate(20);
        }


        clientDbModel.create(input).then(clientdb => {
            /**
             * We put all the info that we need for the client_meta
             *
             */
            let clientMeta;
            clientMeta = {
                clientId: clientdb.id,
                userId: req.user.id,
                type: input.type,
                createdAt: new Date(),
                modifiedAt: new Date(),
            };
            clientMetaModel.create(clientMeta).then(clientmeta => {
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
    const clientDbModel = req.model.ClientDb;
    let limit = req.param('limit', 10);
    const page = req.param('page', 1);
    let offset = limit * (page - 1);
    limit = (limit > 0) ? limit : 10;
    offset = (offset >= 0) ? offset : 0;
    clientDbModel.findAndCountAll({

        limit,
        offset,
    }).then(result => {
        res.json(result);
    });
};
exports.detailClient = function (req, res) {
    const clientDbModel = req.model.ClientDb;
    clientDbModel.findById(req.params.id).then(user => {
        res.json(user);
    });
};

exports.updateClient = function (req, res) {
    const input = req.body;
    const result = t.validate(input, domain.CreateUpdateDbInput);
    if (result.isValid()) {
        const clientDbModel = req.model.ClientDb;
        clientDbModel.findById(req.params.id).then(client => {
            if (client) {
                input.autoUpdate = true;
                input.dbName = `client_${input.identifier}`;
                input.dbLogin = `b7_${input.identifier}`;
                input.active = true;
                clientDbModel.update(input, {
                    where: { id: client.id },
                    returning: true,
                    plain: true,
                })
                    .then(result => {
                        /**
                         * We put all the info that we need for the client_meta
                         *
                         */


                        res.json(result);
                    });
            } else {
                res.status(404).json({message: 'client does not exists'});
            }
        });
    } else {
        res.status(400).json(result.errors);
    }
};

