'use strict';

const clientController = require('../controllers/client');
const acl = require('../acl/acl_middleware');

module.exports = function (passport, express) {
    const app = express();
    app.route('/:id')
        .get(clientController.detailClient)
        .put(clientController.updateClient)
        .delete(clientController.removeClient);
    app.route('/')
        .post(clientController.addClient)
        .get(clientController.listClient);
    app.route('/elevate')
        .post(acl.isManager, clientController.elevateClient);

    return app;
};
