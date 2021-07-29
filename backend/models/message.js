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
      // define association hereassociate: function(models) {
      Message.hasMany(models.Reponse, { onDelete: 'cascade' });
    }
  };
  const user = sequelize.define('user', { name: DataTypes.INTEGER });
  Message.init({
    title: DataTypes.STRING,

    message: DataTypes.TEXT,

    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: user,
        key: 'id',
        foreignKey: {
          allowNull: false
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Message',
  });
  user.belongsTo(Message)
  return Message;
};