/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING(255),
            field: 'username',
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(255),
            field: 'name',
            allowNull: false
        },
        role: {
            type: DataTypes.STRING(255),
            field: 'role',
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(255),
            field: 'password',
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at',
            allowNull: false
        },
        modifiedAt: {
            type: DataTypes.DATE,
            field: 'modified_at',
            allowNull: false
        }
    }, {
        schema: 'public',
        tableName: 'users',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

};
