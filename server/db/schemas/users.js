/**
File auto-generated
* */

const Schema    = require('dbaseql/libs/utils/schema');

module.exports = {
    attributes: {
        clientMeta: {
            references: {
                associationType: Schema.AssociationTypes.ONE_TO_MANY,
                model: 'clientMeta',
                referencedBy: 'user_id',
                table: 'client_meta',
            },
            type: Schema.DataTypes.ARRAY,
        },
        createdAt: {
            column: 'created_at',
            isNullable: false,
            type: Schema.DataTypes.DATE,
        },
        deletedAt: {
            column: 'deleted_at',
            type: Schema.DataTypes.DATE,
        },
        id: {
            column: 'id',
            isNullable: false,
            isPrimaryKey: true,
            type: Schema.DataTypes.INTEGER,
        },
        isActive: {
            column: 'is_active',
            default: true,
            isNullable: false,
            type: Schema.DataTypes.BOOLEAN,
        },
        modifiedAt: {
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

