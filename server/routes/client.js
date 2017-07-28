'use strict';

const clientController = require('../controllers/client');
const acl = require('../acl/acl_middleware');

module.exports = (passport, express) => {
    const app = express();

    app.route('/:id(\\d+)/activate')
        .put(clientController.activateClient);
    app.route('/:id(\\d+)/manteinance')
        .put(clientController.manteinanceClient);
    app.route('/:id(\\d+)/autoUpdate')
        .put(clientController.autoUpdateClient);
    app.route('/:id(\\d+)/invoice')
        .put(clientController.newInvoiceClient);
    app.route('/:id(\\d+)/channel')
        .put(clientController.channelClient);
    app.route('/:id(\\d+)/ikentoo')
        .put(clientController.ikentooClient);
    app.route('/:id(\\d+)')
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

