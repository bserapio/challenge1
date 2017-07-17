'use strict';

const roles = require('../../config/role');

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
            validate: {
                isUnique: function (value, next) {
                    var self = this;
                    User.find({where: {username: value}})
                        .then(function (user) {
                            // reject if a different user wants to use the same email
                            if (user && self.id !== user.id) {
                                return next('Username already in use!');
                            }
                            return next();
                        })
                        .catch(function (err) {
                            return next(err);
                        });
                }
            }
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
            validate: {
                isAllowed(value) {
                    if (!roles.hasOwnProperty(value.trim().toLowerCase())) {
                        throw new Error('Role is not permitted');
                    }
                    this.setDataValue('role', value.trim().toLowerCase());
                },
            },
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
    }, {
        schema: 'public',
        tableName: 'users',
        timestamps: false,
        underscored: true,
        hooks: {
            beforeCreate: user => {
                user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
            },
            beforeUpdate: user => {
                user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
            },
        },
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
