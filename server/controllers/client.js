var t = require('tcomb-validation');
var validate = t.validate;
var domain =  require('../validator');
var moment = require('moment');
var randomstring = require("randomstring");


exports.addClient = function(req, res) {
    var clientDbModel = req.model.ClientDb;
    var clientMetaModel = req.model.ClientMeta;
    var input = req.body;
    var result = t.validate(input, domain.CreateDbInput);
    if (result.isValid()) {

        input.autoUpdate= true;
        input.dbName = 'client_'+input.identifier;
        input.dbLogin = 'b7_'+input.identifier;
        input.active=true;
        if (!(input.hasOwnProperty('dbPass'))) {
            input.dbPass = randomstring.generate(20);
        }


        clientDbModel.create(input).then(clientdb => {

            /**
             * We put all the info that we need for the client_meta
             *
             */
                var clientMeta;
                clientMeta ={
                    clientId:clientdb.id,
                    userId:req.user.id,
                    type:input.type,
                    createdAt: new Date(),
                    modifiedAt: new Date(),
                }
            clientMetaModel.create(clientMeta).then(clientmeta=>{
                if (clientmeta) {
                    result = {
                        client:clientdb,
                        meta:clientmeta
                    };
                    res.json(result);
                } else {
                    res.json(400).json({message:"Error Creating clientMeta"});
                }
            });
        })

    } else {
        res.status(400).json(result.errors);
    }

};
exports.listClient = function(req,res) {
    var clientDbModel = req.model.ClientDb;
    var limit = req.param('limit',10);
    var page = req.param('page',1);
    var offset = limit * ( page -1);
    limit = (limit >0) ? limit : 10;
    offset = (offset >=0)? offset: 0;
    clientDbModel.findAndCountAll({

        limit: limit,
        offset: offset,
    }).then(function (result) {
        res.json(result);
    });

};
exports.detailClient = function(req,res) {
    var clientDbModel = req.model.ClientDb;
    clientDbModel.findById(req.params.id).then(user => {
        res.json(user);
    });
};

exports.updateClient = function(req,res) {
    var input = req.body;
    var result = t.validate(input, domain.CreateUpdateDbInput);
    if (result.isValid()) {
        var clientDbModel = req.model.ClientDb;
        clientDbModel.findById(req.params.id).then(client => {
            if (client) {
                input.autoUpdate= true;
                input.dbName = 'client_'+input.identifier;
                input.dbLogin = 'b7_'+input.identifier;
                input.active=true;
                clientDbModel.update(input, {
                    where: { id: client.id },
                    returning: true,
                    plain: true
                })
                    .then(function (result) {
                        /**
                         * We put all the info that we need for the client_meta
                         *
                         */



                        res.json(result)
                    });
            } else {
                res.status(404).json({message:"client does not exists"});
            }


        })
    } else {

        res.status(400).json(result.errors);
    }
};

