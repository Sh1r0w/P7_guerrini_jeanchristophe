'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reponse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Reponse.init({
    reponse: DataTypes.STRING,
    userId: DataTypes.STRING,
    messageId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Reponse',
  });
  return Reponse;
};