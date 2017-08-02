'use strict';

const userController = require('../controllers/user');


module.exports = (passport, express) => {
    const app = express();
    app.route('/:id(\\d+)/client')
        .get(userController.clientListUser);
    app.route('/:id(\\d+)/delete')
        .put(userController.deleteUser);
    app.route('/:id(\\d+)/activate')
        .put(userController.activateUser);
    app.route('/:id(\\d+)')
        .put(userController.updateUser)
        .get(userController.detailUser);
    app.route('/')
        .post(userController.addUser)
        .get(userController.listUser);


    return app;
};
