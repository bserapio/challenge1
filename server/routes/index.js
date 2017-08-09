'use strict';

const indexController = require('../controllers/index');

module.exports = (passport, express) => {
    const router = express.Router();
    router.post('/login', indexController.login);
    router.get('/logout', indexController.logout);
    return router;
};
