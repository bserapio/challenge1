/**
File auto-generated
**/

const Schema    = require('dbaseql/libs/utils/schema');

module.exports = {
    attributes: {
        channelManager: {
            column: 'channel_manager',
            default: false,
            isNullable: false,
            type: Schema.DataTypes.BOOLEAN
        },
        clientId: {
            column: 'client_id',
            isNullable: false,
            type: Schema.DataTypes.INTEGER
        },
        clientDb: {
            column: 'client_id',
            references: {
                associationType: Schema.AssociationTypes.MANY_TO_ONE,
                model: 'clientDb',
                table: 'client_db',
                targetKey: 'id'
            },
            type: Schema.DataTypes.INTEGER
        },
        createdAt: {
            column: 'created_at',
            isNullable: false,
            type: Schema.DataTypes.DATE
        },
        cubilis: {
            column: 'cubilis',
            default: false,
            isNullable: false,
            type: Schema.DataTypes.BOOLEAN
        },
        id: {
            column: 'id',
            isNullable: false,
            isPrimaryKey: true,
            type: Schema.DataTypes.INTEGER
        },
        ikentoo: {
            column: 'ikentoo',
            default: false,
            isNullable: false,
            type: Schema.DataTypes.BOOLEAN
        },
        lastLogin: {
            column: 'last_login',
            type: Schema.DataTypes.DATE
        },
        modifiedAt: {
            column: 'modified_at',
            isNullable: false,
            type: Schema.DataTypes.DATE
        },
        newChannel: {
            column: 'new_channel',
            default: true,
            isNullable: false,
            type: Schema.DataTypes.BOOLEAN
        },
        newInvoice: {
            column: 'new_invoice',
            default: true,
            isNullable: false,
            type: Schema.DataTypes.BOOLEAN
        },
        seekda: {
            column: 'seekda',
            default: false,
            isNullable: false,
            type: Schema.DataTypes.BOOLEAN
        },
        type: {
            column: 'type',
            isNullable: false,
            type: Schema.DataTypes.STRING
        },
        userId: {
            column: 'user_id',
            isNullable: false,
            type: Schema.DataTypes.INTEGER
        },
        users: {
            column: 'user_id',
            references: {
                associationType: Schema.AssociationTypes.MANY_TO_ONE,
                model: 'users',
                table: 'users',
                targetKey: 'id'
            },
            type: Schema.DataTypes.INTEGER
        }
    },
    name: 'clientMeta',
    tableName: 'client_meta'
};

