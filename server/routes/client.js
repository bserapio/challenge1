const client_controller = require('../controllers/client');
const middleware = require('../middleware');
module.exports = function (passport, express) {
    const router = express.Router();
    router.get('/:id', middleware.isAuthenticated, client_controller.detailClient);
    router.put('/:id', client_controller.updateClient);
    router.post('/', middleware.isAuthenticated, client_controller.addClient);
    router.get('/', middleware.isAuthenticated, client_controller.listClient);
    return router;
};
