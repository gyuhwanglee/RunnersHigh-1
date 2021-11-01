'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.removeConstraint('usersPosts', 'usersposts_postId')
    await queryInterface.removeColumn('usersPosts', 'postId')
    await queryInterface.removeConstraint('usersPosts', 'usersposts_userId')
    await queryInterface.removeColumn('usersPosts', 'userId')
    await queryInterface.dropTable('usersPosts')
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
}
