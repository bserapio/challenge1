/**
 File auto-generated
 * */

'use strict';


const Schema    = require('dbaseql/libs/utils/schema');

module.exports = {
    attributes: {
        client_metas2: {
            references: {
                associationType: Schema.AssociationTypes.ONE_TO_MANY,
                model: 'clientMeta',
                referencedBy: 'user_id',
                table: 'client_meta',
            },
            type: Schema.DataTypes.ARRAY,
        },
        created_at: {
            column: 'created_at',
            isNullable: false,
            type: Schema.DataTypes.DATE,
        },
        deleted_at: {
            column: 'deleted_at',
            type: Schema.DataTypes.DATE,
        },
        id: {
            column: 'id',
            isNullable: false,
            isPrimaryKey: true,
            type: Schema.DataTypes.INTEGER,
        },
        is_active: {
            column: 'is_active',
            default: true,
            isNullable: false,
            type: Schema.DataTypes.BOOLEAN,
        },
        modified_at: {
            column: 'modified_at',
            isNullable: false,
            type: Schema.DataTypes.DATE,
        },
        name: {
            column: 'name',
            isNullable: false,
            type: Schema.DataTypes.STRING,
        },
        password: {
            column: 'password',
            isNullable: false,
            type: Schema.DataTypes.STRING,
        },
        role: {
            column: 'role',
            isNullable: false,
            type: Schema.DataTypes.STRING,
        },
        username: {
            column: 'username',
            isNullable: false,
            type: Schema.DataTypes.STRING,
        },
    },
    name: 'users',
    tableName: 'users',
};

