const clientController = require('../controllers/client');
const middleware = require('../middleware');
module.exports = function (passport, express) {
    const router = express.Router();
    router.get('/:id', middleware.isAuthenticated, clientController.detailClient);
    router.put('/:id', middleware.isAuthenticated, clientController.updateClient);
    router.delete('/:id', middleware.isAuthenticated, clientController.removeClient);
    router.post('/elevate', middleware.isAuthenticated, clientController.elevateClient);
    router.post('/', middleware.isAuthenticated, clientController.addClient);
    router.get('/', middleware.isAuthenticated, clientController.listClient);
    return router;
};
