'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
            return queryInterface.createTable('users',
            {
                "id": {
                    "type": "INTEGER",
                    "allowNull": false,
                    "primaryKey": true,
                    "autoIncrement": true
                },
                "username": {
                    "type": "VARCHAR(255)",
                    "allowNull": false
                },
                "name": {
                    "type": "VARCHAR(255)",
                    "allowNull": false
                },
                "role": {
                    "type": "VARCHAR(255)",
                    "allowNull": false
                },
                "password": {
                    "type": "VARCHAR(255)",
                    "allowNull": false
                },
                "createdAt": {
                    "type": "TIMESTAMP WITH TIME ZONE",
                    "allowNull": false
                },
                "modifiedAt": {
                    "type": "TIMESTAMP WITH TIME ZONE",
                    "allowNull": false
                }
            })
        

      
    },
    down: function(queryInterface, Sequelize) {
     
            return queryInterface.dropTable('users');
     
    }
};