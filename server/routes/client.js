

var client_controller = require('../controllers/client');
var middleware = require('../middleware');
module.exports = function(passport,express) {
    var router = express.Router();
    router.post('/',middleware.isAuthenticated,client_controller.addClient);
    router.get('/',middleware.isAuthenticated,client_controller.listClient);
    router.get('/:id',middleware.isAuthenticated,client_controller.detailClient);
    router.put('/:id',client_controller.updateClient);


    return router;

}