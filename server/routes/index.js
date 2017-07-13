const indexController = require('../controllers/index');
const middleware = require('../middleware');
module.exports = function (passport, express) {
    const router = express.Router();
    router.post('/login', passport.authenticate('local-login'), indexController.login);
    router.post('/logout', middleware.isAuthenticated, indexController.logout);
    return router;
};
