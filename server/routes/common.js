'use strict';

const commonController = require('../controllers/common');

module.exports = (passport, express) => {
    const app = express();
    app.route('/langs').get(commonController.getLanguages);
    app.route('/roles').get(commonController.getRoles);
    app.route('/types').get(commonController.getTypes);
    return app;
};
