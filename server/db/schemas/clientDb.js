/**
 File auto-generated
 * */

'use strict';


const Schema    = require('dbaseql/libs/utils/schema');

module.exports = {
    attributes: {
        active: {
            column: 'active',
            default: false,
            isNullable: false,
            type: Schema.DataTypes.BOOLEAN,
        },
        archived_at: {
            column: 'archived_at',
            type: Schema.DataTypes.DATE,
        },
        auto_update: {
            column: 'auto_update',
            type: Schema.DataTypes.BOOLEAN,
        },
        client_id: {
            column: 'client_id',
            type: Schema.DataTypes.INTEGER,
        },
        client_metas: {
            references: {
                associationType: Schema.AssociationTypes.ONE_TO_MANY,
                model: 'clientMeta',
                referencedBy: 'client_id',
                table: 'client_meta',
            },
            type: Schema.DataTypes.ARRAY,
        },
        db_login: {
            column: 'db_login',
            isNullable: false,
            type: Schema.DataTypes.STRING,
        },
        db_name: {
            column: 'db_name',
            isNullable: false,
            type: Schema.DataTypes.STRING,
        },
        db_pass: {
            column: 'db_pass',
            isNullable: false,
            type: Schema.DataTypes.STRING,
        },
        expire_date: {
            column: 'expire_date',
            type: Schema.DataTypes.DATE,
        },
        id: {
            column: 'id',
            isNullable: false,
            isPrimaryKey: true,
            type: Schema.DataTypes.INTEGER,
        },
        identifier: {
            column: 'identifier',
            isNullable: false,
            type: Schema.DataTypes.STRING,
        },
        lang: {
            column: 'lang',
            type: Schema.DataTypes.STRING,
        },
        maintenance: {
            column: 'maintenance',
            default: false,
            isNullable: false,
            type: Schema.DataTypes.BOOLEAN,
        },
        name: {
            column: 'name',
            isNullable: false,
            type: Schema.DataTypes.STRING,
        },
    },
    name: 'clientDb',
    tableName: 'client_db',
};

