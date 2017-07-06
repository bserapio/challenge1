

var index_controller = require('../controllers/index');
var middleware = require('../middleware');
module.exports = function(passport,express) {
    var router = express.Router();
    router.post('/login',passport.authenticate('local-login'),index_controller.login);
    router.post('/logout',middleware.isAuthenticated,index_controller.logout);
    return router;

}
