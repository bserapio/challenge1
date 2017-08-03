'use strict';

module.exports = {
    up(queryInterface, Sequelize) {

        queryInterface.addConstraint('users', ['username'], {
            type: 'unique',
            name: 'user_unique_username'
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
