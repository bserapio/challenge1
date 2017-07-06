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

// Display detail page for a specific Author
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
            res.json(clientdb);

        })

    } else {
        res.status(400).json(result.errors);
    }

};
