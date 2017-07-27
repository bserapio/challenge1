'use strict';

const clientController = require('../controllers/client');
const acl = require('../acl/acl_middleware');

module.exports = (passport, express) => {
    const app = express();

    app.route('/:id/activate')
        .put(clientController.activateClient);
    app.route('/:id/manteinance')
        .put(clientController.manteinanceClient);
    app.route('/:id/autoUpdate')
        .put(clientController.autoUpdateClient);
    app.route('/:id/invoice')
        .put(clientController.newInvoiceClient);
    app.route('/:id/channel')
        .put(clientController.channelClient);
    app.route('/:id/ikentoo')
        .put(clientController.ikentooClient);
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

