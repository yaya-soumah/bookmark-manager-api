'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bookmarks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      url: {
        type: Sequelize.STRING,
      },
      isFavorite: {
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      isPublic: {
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      folderId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'folders',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
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
    await queryInterface.dropTable('bookmarks')
  },
}
