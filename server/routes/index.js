'use strict';

const indexController = require('../controllers/index');

module.exports = (passport, express) => {
    const router = express.Router();
    router.post('/login', passport.authenticate('local-login'), indexController.login);
    router.post('/logout', indexController.logout);
    return router;
};
