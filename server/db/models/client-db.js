/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('ClientDb', {
        id: {
            type: DataTypes.INTEGER,
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        clientId: {
            type: DataTypes.INTEGER,
            field: 'client_id',
            allowNull: true
        },
        identifier: {
            type: DataTypes.STRING(31),
            field: 'identifier',
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(255),
            field: 'name',
            allowNull: false
        },
        lang: {
            type: DataTypes.STRING(2),
            field: 'lang',
            allowNull: true
        },
        dbName: {
            type: DataTypes.STRING(31),
            field: 'db_name',
            allowNull: false
        },
        dbLogin: {
            type: DataTypes.STRING(31),
            field: 'db_login',
            allowNull: false
        },
        dbPass: {
            type: DataTypes.STRING(31),
            field: 'db_pass',
            allowNull: false
        },
        active: {
            type: DataTypes.BOOLEAN,
            field: 'active',
            allowNull: false,
            defaultValue: false
        },
        maintenance: {
            type: DataTypes.BOOLEAN,
            field: 'maintenance',
            allowNull: false,
            defaultValue: false
        },
        autoUpdate: {
            type: DataTypes.BOOLEAN,
            field: 'auto_update',
            allowNull: true
        },
        expireDate: {
            type: DataTypes.DATEONLY,
            field: 'expire_date',
            allowNull: true
        },
        archivedAt: {
            type: DataTypes.DATE,
            field: 'archived_at',
            allowNull: true
        }
    }, {
        schema: 'public',
        tableName: 'client_db',
        timestamps: false,
        hooks: {
            afterCreate: (client, options) => {
                return client.set('clientId', client.get('id')).save().then((self) => {
                    return self;
                });

            }
        }
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

};
