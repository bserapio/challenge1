'use strict';

const clientController = require('../controllers/client');
const acl = require('../acl/acl_middleware');

module.exports = function (passport, express) {
    const app = express();

    app.route('/:id/activate')
        .put(clientController.activateClient);
    app.route('/:id/manteinance')
        .put(clientController.manteinanceClient);
    app.route('/:id/autoUpdate')
        .put(acl.isManager, clientController.autoUpdateClient);
    app.route('/:id/invoice')
        .put(acl.isManager, clientController.newInvoiceClient);
    app.route('/:id/channel')
        .put(acl.isManager, clientController.channelClient);
    app.route('/:id/ikentoo')
        .put(acl.isManager, clientController.ikentooClient);
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


