'use strict';

module.exports = {
    up(queryInterface, Sequelize) {
        queryInterface.addConstraint('client_meta', ['user_id'], {
            type: 'FOREIGN KEY',
            references: { // Required field
                table: 'users',
                field: 'id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
    },

    down(queryInterface, Sequelize) {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.dropTable('users');
        */
    },
};
