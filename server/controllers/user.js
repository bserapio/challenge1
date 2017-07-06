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
