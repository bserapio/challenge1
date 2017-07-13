const userController = require('../controllers/user');
const middleware = require('../middleware');
module.exports = function (passport, express) {
    const router = express.Router();
    router.put('/:id/client/:idMeta', middleware.isAuthenticated, userController.clientUpdateDetailUser);
    router.get('/:id/client/:idMeta', middleware.isAuthenticated, userController.clientDetailUser);
    router.get('/:id/client', middleware.isAuthenticated, userController.clientListUser);
    router.get('/:id', middleware.isAuthenticated, userController.detailUser);
    router.put('/:id', middleware.isAuthenticated, userController.updateUser);
    router.post('/', middleware.isAuthenticated, userController.addUser);
    router.get('/', middleware.isAuthenticated, userController.listUser);


    return router;
};
