'use strict';

const userController = require('../controllers/user');
const acl = require('../acl/acl_middleware');

module.exports = function (passport, express) {
    const app = express();
    app.route('/:id/client/:idMeta')
        .put(userController.clientUpdateDetailUser)
        .get(userController.clientDetailUser);
    app.route('/:id/client')
        .get(userController.clientListUser);
    app.route('/:id')
        .put(userController.updateUser)
        .get(userController.detailUser);
    app.route('/')
        .post(acl.isAdmin, userController.addUser)
        .get(acl.isAdmin, userController.listUser);


    return app;
};
