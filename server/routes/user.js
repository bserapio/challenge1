

var user_controller = require('../controllers/users');
var middleware = require('../middleware');
module.exports = function(passport,express) {
    var router = express.Router();
    router.post('/',middleware.isAuthenticated,user_controller.addUser);
    router.get('/',middleware.isAuthenticated,user_controller.listUser);
    router.get('/:id',middleware.isAuthenticated,user_controller.detailUser);

    return router;

}
