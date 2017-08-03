/**
File auto-generated
* */

'use strict';

const Schema    = require('dbaseql/libs/utils/schema');

module.exports = {
    attributes: {
        channel_manager: {
            column: 'channel_manager',
            default: false,
            isNullable: false,
            type: Schema.DataTypes.BOOLEAN,
        },
        client_db: {
            column: 'client_id',
            references: {
                associationType: Schema.AssociationTypes.MANY_TO_ONE,
                model: 'clientDb',
                table: 'client_db',
                targetKey: 'id',
            },
            type: Schema.DataTypes.INTEGER,
        },
        client_id: {
            column: 'client_id',
            isNullable: false,
            type: Schema.DataTypes.INTEGER,
        },
        created_at: {
            column: 'created_at',
            isNullable: false,
            type: Schema.DataTypes.DATE,
        },
        cubilis: {
            column: 'cubilis',
            default: false,
            isNullable: false,
            type: Schema.DataTypes.BOOLEAN,
        },
        id: {
            column: 'id',
            isNullable: false,
            isPrimaryKey: true,
            type: Schema.DataTypes.INTEGER,
        },
        ikentoo: {
            column: 'ikentoo',
            default: false,
            isNullable: false,
            type: Schema.DataTypes.BOOLEAN,
        },
        last_login: {
            column: 'last_login',
            type: Schema.DataTypes.DATE,
        },
        modified_at: {
            column: 'modified_at',
            isNullable: false,
            type: Schema.DataTypes.DATE,
        },
        new_channel: {
            column: 'new_channel',
            default: true,
            isNullable: false,
            type: Schema.DataTypes.BOOLEAN,
        },
        new_invoice: {
            column: 'new_invoice',
            default: true,
            isNullable: false,
            type: Schema.DataTypes.BOOLEAN,
        },
        seekda: {
            column: 'seekda',
            default: false,
            isNullable: false,
            type: Schema.DataTypes.BOOLEAN,
        },
        type: {
            column: 'type',
            isNullable: false,
            type: Schema.DataTypes.STRING,
        },
        user_id: {
            column: 'user_id',
            isNullable: false,
            type: Schema.DataTypes.INTEGER,
        },
        users: {
            column: 'user_id',
            references: {
                associationType: Schema.AssociationTypes.MANY_TO_ONE,
                model: 'users',
                table: 'users',
                targetKey: 'id',
            },
            type: Schema.DataTypes.INTEGER,
        },
    },
    name: 'clientMeta',
    tableName: 'client_meta',
};

