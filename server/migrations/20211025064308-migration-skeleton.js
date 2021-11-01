'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('usersPosts', 'userId', { type: Sequelize.INTEGER })
    await queryInterface.addConstraint('usersPosts', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'usersposts_userId',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
    await queryInterface.addColumn('usersPosts', 'postId', { type: Sequelize.INTEGER })
    await queryInterface.addConstraint('usersPosts', {
      fields: ['postId'],
      type: 'foreign key',
      name: 'usersposts_postId',
      references: {
        table: 'posts',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('usersPosts', 'usersposts_postId')
    await queryInterface.removeColumn('usersPosts', 'postId')
    await queryInterface.removeConstraint('usersPosts', 'usersposts_userId')
    await queryInterface.removeColumn('usersPosts', 'userId')
  }
}
