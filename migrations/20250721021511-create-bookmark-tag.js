'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bookmark_tags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      bookmarkId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'bookmarks',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      tagId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'tags',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('bookmark_tags')
  },
}
