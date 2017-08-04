'use strict';

const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING(255),
            field: 'username',
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(255),
            field: 'name',
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING(255),
            field: 'role',
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(255),
            field: 'password',
            allowNull: false,
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
        deletedAt: {
            type: DataTypes.DATE,
            field: 'deleted_at',
            allowNull: true,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            field: 'is_active',
            allowNull: false,
            defaultValue: true,
        },
    }, {
        schema: 'public',
        tableName: 'users',
        timestamps: false,
        underscored: true,
    });

    User.prototype.validPassword = function (password) {
        let hash = this.password;
        hash = hash.substring(4);
        hash = `$2a$${hash}`;
        return bcrypt.compareSync(password, hash);
    };

    User.associate = function (models) {
        User.hasMany(models.ClientMeta, {
            onDelete: 'CASCADE',
            foreignKey: 'user_id',

        });
    };

    return User;
};