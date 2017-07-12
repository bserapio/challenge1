/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => sequelize.define('ClientMeta', {
    id: {
        type: DataTypes.INTEGER,
        field: 'id',
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    clientId: {
        type: DataTypes.INTEGER,
        field: 'client_id',
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        field: 'user_id',
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING(255),
        field: 'type',
        allowNull: false,
    },
    newInvoice: {
        type: DataTypes.BOOLEAN,
        field: 'new_invoice',
        allowNull: false,
        defaultValue: true,
    },
    newChannel: {
        type: DataTypes.BOOLEAN,
        field: 'new_channel',
        allowNull: false,
        defaultValue: true,
    },
    cubilis: {
        type: DataTypes.BOOLEAN,
        field: 'cubilis',
        allowNull: false,
        defaultValue: false,
    },
    ikentoo: {
        type: DataTypes.BOOLEAN,
        field: 'ikentoo',
        allowNull: false,
        defaultValue: false,
    },
    seekda: {
        type: DataTypes.BOOLEAN,
        field: 'seekda',
        allowNull: false,
        defaultValue: false,
    },
    channelManager: {
        type: DataTypes.BOOLEAN,
        field: 'channel_manager',
        allowNull: false,
        defaultValue: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
        allowNull: false,
    },
    modifiedAt: {
        type: DataTypes.DATE,
        field: 'modified_at',
        allowNull: false,
    },
    lastLogin: {
        type: DataTypes.DATE,
        field: 'last_login',
        allowNull: true,
    },
}, {
    schema: 'public',
    tableName: 'client_meta',
    timestamps: false,
});

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
};
