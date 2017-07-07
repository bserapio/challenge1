var t = require('tcomb-validation');
var validate = t.validate;
var domain =  require('../validator');
var moment = require('moment');
var randomstring = require("randomstring");
// Display list of all Authors
exports.user_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Author list');
};

// Display detail page for a specific Author
exports.addUser = function(req, res) {
    var userModel = req.model.User;
    var input = req.body;
    var result = t.validate(input, domain.CreateInput);
    if (result.isValid()) {
        input.createdAt = new Date();
        input.modifiedAt= new Date();
        userModel.create(input).then(user => {
            res.json(user);
        })

    } else {
        res.status(400).json(result.errors);
    }
};
exports.listUser = function(req,res) {
    var userModel = req.model.User;
    var limit = req.param('limit',10);
    var page = req.param('page',1);
    var offset = limit * ( page -1);
    limit = (limit >0) ? limit : 10;
    offset = (offset >=0)? offset: 0;
    userModel.findAndCountAll({

        limit: limit,
        offset: offset,
    }).then(function (result) {
        res.json(result);
    });

};
exports.detailUser = function(req,res) {
    var userModel = req.model.User;
    userModel.findById(req.params.id).then(user => {
        res.json(user);
    });
};
exports.updateUser = function(req,res) {
    var input = req.body;
    var result = t.validate(input, domain.CreateUpdateInput);
    if (result.isValid()) {
        var userModel = req.model.User;
        userModel.findById(req.params.id).then(user => {
            if (user) {
                userModel.update(input, {
                    where: { id: user.id },
                    returning: true,
                    plain: true
                })
                    .then(function (result) {
                        res.json(result)
                    });
            } else {
                res.status(404).json({message:"user does not exists"});
            }


        })
    } else {

        res.status(400).json(result.errors);
    }
};
exports.clientListUser = function(req,res) {
    var limit = req.param('limit',10);
    var page = req.param('page',1);
    var offset = limit * ( page -1);
    limit = (limit >0) ? limit : 10;
    offset = (offset >=0)? offset: 0;
    var clientMetaModel = req.model.ClientMeta;
    clientMetaModel.findAndCountAll({
        where:{userId:req.user.id},
        limit: limit,
        offset: offset,
    }).then(function (result) {
        res.json(result);
    });

};
exports.clientDetailUser = function(req,res) {

    var clientMetaModel = req.model.ClientMeta;
    clientMetaModel.findOne({
        where:{userId:req.params.id,id:req.params.idMeta},
    }).then(function (result) {
        res.json(result);
    });

};

exports.clientUpdateDetailUser = function(req,res) {

    var input = req.body;
    var result = t.validate(input, domain.CreateUpdateMetaDbInput);
    if (result.isValid()) {

        var clientMetaModel = req.model.ClientMeta;
        clientMetaModel.findOne({
            where:{userId:req.params.id,id:req.params.idMeta},
        }).then( client => {

            if (client) {
                clientMetaModel.update(input, {
                    where: { id: client.id },
                    returning: true,
                    plain: true
                })
                    .then(function (result) {
                        res.json(result)
                    });

            } else {
                res.status(404);
            }
        });


    } else {
        res.status(400).json(result.errors);
    }



};
