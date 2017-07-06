

var user_controller = require('../controllers/users');
var middleware = require('../middleware');
module.exports = function(passport,express) {
    var router = express.Router();
    router.post('/create',middleware.isAuthenticated,user_controller.addUser);


    return router;

}
