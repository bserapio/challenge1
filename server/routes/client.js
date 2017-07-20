'use strict';

const clientController = require('../controllers/client');


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
        .post(clientController.elevateClient);

    return app;
};
