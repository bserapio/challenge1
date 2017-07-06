

var client_controller = require('../controllers/clients');
var middleware = require('../middleware');
module.exports = function(passport,express) {
    var router = express.Router();
    router.post('/',middleware.isAuthenticated,client_controller.addClient);
    router.get('/',middleware.isAuthenticated,client_controller.listClient);
    router.get('/:id',middleware.isAuthenticated,client_controller.detailClient);

    return router;

}
