'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class bookmark_tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  bookmark_tag.init(
    {
      bookmarkId: DataTypes.INTEGER,
      tagId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'bookmark_tag',
    },
  )
  return bookmark_tag
}
