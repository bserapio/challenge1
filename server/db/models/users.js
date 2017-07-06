/* eslint new-cap: "off", global-require: "off" */

var roles = require('../../config/role');
var bcrypt = require('bcrypt-nodejs');
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
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
            allowNull: false,
            validate: {
                isAllowed(value) {
                    if(!roles.hasOwnProperty(value.trim().toLowerCase())){
                        throw new Error('Role is not permitted')
                    }
                    this.setDataValue('role', value.trim().toLowerCase());
                }
            }
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
        timestamps: false,
        hooks: {
            beforeCreate: (user, options) => {
               user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
            }
        }
    });

    User.prototype.validPassword= function(password) {
        var hash =this.password;
        hash = hash.substring(4);
        hash = '$2a$'+hash;
        var compare = bcrypt.compareSync(password,hash);

        return compare
    };
    return User;
};
