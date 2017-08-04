/**
 * Created by ggarrido on 28/06/17.
 */

'use strict';

const ModelFactory = require('dbaseql/libs/factories/sequelizeModelFactory');
const OrmService = require('dbaseql/libs/services/orm');
const ConnectorService = require('dbaseql/libs/services/connector');
const DataProvider = require('dbaseql/libs/dataProvider');
const loadSchemas = require('dbaseql/libs/utils/loadSchemas');
const path = require('path');

const env = process.env.NODE_ENV || 'development';

const parameters = require(`${__dirname}/../../config/parameters.json`)[env]; // eslint-disable-line


const connectorService = new ConnectorService({
    connections: {
        pool_name: {
            connector: parameters.db_driver,
            host: parameters.db_host,
            user: parameters.db_user,
            pass: parameters.db_pass,
            dbName: parameters.db_name,
        },
    },
});

const testSchemas = loadSchemas({
    schemaContext: path.join(__dirname, './schemas'),
    schemaPath: path.join(__dirname, './schemas'),
});

const ormService = new OrmService({
    modelFactory: new ModelFactory(),
    connectorService,
    modelSchemas: {
        schema_name: testSchemas,
    },
});

const dataProviders = {};
const connections = {};

module.exports = {
    getDataProvider: async (poolName, schemaName) => {
        if (!dataProviders[poolName]) dataProviders[poolName] = {};
        if (!dataProviders[poolName][schemaName]) {
            const models = await ormService.getModels(poolName, schemaName);
            dataProviders[poolName][schemaName] = new DataProvider(models);
        }
        return dataProviders[poolName][schemaName];
    },
    getDbConnection: async poolName => {
        if (!connections[poolName]) {
            connections[poolName] = await connectorService.getConnection(poolName);
        }
        return connections[poolName];
    },
};
