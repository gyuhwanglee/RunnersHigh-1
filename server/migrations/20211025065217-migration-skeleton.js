'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('comments', 'userId', { type: Sequelize.INTEGER })
    await queryInterface.addConstraint('comments', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'comments_userId',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
    await queryInterface.addColumn('comments', 'postId', { type: Sequelize.INTEGER })
    await queryInterface.addConstraint('comments', {
      fields: ['postId'],
      type: 'foreign key',
      name: 'comments_postId',
      references: {
        table: 'posts',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('comments', 'comments_postId')
    await queryInterface.removeColumn('comments', 'postId')
    await queryInterface.removeConstraint('comments', 'comments_userId')
    await queryInterface.removeColumn('comments', 'userId')
  }
}
