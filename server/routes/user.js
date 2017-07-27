'use strict';

const userController = require('../controllers/user');
const acl = require('../acl/acl_middleware');

module.exports = (passport, express) => {
    const app = express();
    app.route('/:id/client')
        .get(userController.clientListUser);
    app.route('/:id')
        .put(userController.updateUser)
        .get(userController.detailUser);
    app.route('/')
        .post(userController.addUser)
        .get(userController.listUser);


    return app;
};
