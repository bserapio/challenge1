var t = require('tcomb-validation');
var validate = t.validate;
var domain =  require('../validator');

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
