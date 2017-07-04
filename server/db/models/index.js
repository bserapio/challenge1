/* eslint global-require: "off" */
const model = {};
let initialized = false;

/**
 * Initializes sequelize models and their relations.
 * @param   {Object} sequelize  - Sequelize instance.
 * @returns {Object}            - Sequelize models.
 */
function init(sequelize) {
    delete module.exports.init; // Destroy itself to prevent repeated calls and clash with a model named 'init'.
    initialized = true;
    // Import model files and assign them to `model` object.
    model.ClientDb = sequelize.import('./definition/client-db.js');
    model.ClientMetum = sequelize.import('./definition/client-meta.js');
    model.User = sequelize.import('./definition/users.js');

    // All models are initialized. Now connect them with relations.
    require('./definition/client-db.js').initRelations();
    require('./definition/client-meta.js').initRelations();
    require('./definition/users.js').initRelations();
    return model;
}

// Note: While using this module, DO NOT FORGET FIRST CALL model.init(sequelize). Otherwise you get undefined.
module.exports = model;
module.exports.init = init;
module.exports.isInitialized = initialized;
