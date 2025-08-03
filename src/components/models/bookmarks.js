'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class bookmarks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  bookmarks.init(
    {
      title: DataTypes.STRING,
      url: DataTypes.STRING,
      isFavorite: DataTypes.BOOLEAN,
      isPublic: DataTypes.BOOLEAN,
      folderId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'bookmarks',
    },
  )
  return bookmarks
}
