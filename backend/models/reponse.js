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
  const user = sequelize.define('user', { name: DataTypes.STRING });
  Reponse.init({
    reponse: DataTypes.STRING,
    userId: {
        type: DataTypes.INTEGER,
        references: {
          model: user,
          key: 'id'
        }
      },
    
  }, {
    sequelize,
    modelName: 'Reponse',
  });
  return Reponse;
};