'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.Message, { onDelete: null });
      user.hasMany(models.Reponse, { onDelete: null });
      user.hasMany(models.like, { onDelete: 'cascade' });
    }
  };
  user.init({
    alias: {
      type: DataTypes.STRING,
      unique: true
    },

    firstName: DataTypes.STRING,

    lastName: DataTypes.STRING,

    password: DataTypes.STRING,

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    moderator: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    actif: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  },
    {
      sequelize,
      modelName: 'user',
    });
  return user;
};