

var user_controller = require('../controllers/user');
var middleware = require('../middleware');
module.exports = function(passport,express) {
    var router = express.Router();
    router.put('/:id/client/:idMeta', middleware.isAuthenticated, user_controller.clientUpdateDetailUser);
    router.get('/:id/client/:idMeta', middleware.isAuthenticated, user_controller.clientDetailUser);
    router.get('/:id/client', middleware.isAuthenticated, user_controller.clientListUser);
    router.get('/:id', middleware.isAuthenticated, user_controller.detailUser);
    router.put('/:id',middleware.isAuthenticated, user_controller.updateUser);
    router.post('/',middleware.isAuthenticated,user_controller.addUser);
    router.get('/',middleware.isAuthenticated,user_controller.listUser);


    return router;

}
