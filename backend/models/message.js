'use strict';
 
const {
  Model, DataTypes
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.a
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Message.hasMany(models.Reponse, { onDelete: 'cascade' });
      Message.hasMany(models.like, { onDelete: 'cascade' });
    }
  };
  Message.init({
    title: DataTypes.STRING,

    message: DataTypes.TEXT,

    imgUrl: DataTypes.STRING,

    like: { 
      type: DataTypes.INTEGER,
    defaultValue: 0
    },

    dislike: { 
      type: DataTypes.INTEGER,
    defaultValue: 0
    },

    reponse: { 
      type: DataTypes.INTEGER,
    defaultValue: 0
    },
  }, {
    sequelize,
    modelName: 'Message',
  });

  return Message;
};