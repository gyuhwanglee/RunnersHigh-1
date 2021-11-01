'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('posts', 'userId', { type: Sequelize.INTEGER })
    await queryInterface.addConstraint('posts', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'posts_userId',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint('posts', 'posts_userId')
    await queryInterface.removeColumn('posts', 'userId')
  }
}
