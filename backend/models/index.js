'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const db = {};
require('dotenv').config();

//utilisation de sequelize pour la communication avec la base de donnée

 const sequelize = new Sequelize(process.env.DB, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    
    pool: {
      max: 5, //nombre maximum de connexions autorisées
      acquire: 40000, //durée maximale, en millisecondes, pendant laquelle le pool cherche à établir la connexion avant qu'un message d'erreur n'apparaisse à l'écran
    },
  },
  );

sequelize
  .authenticate()
  .then(() => console.log('Connexion à la base de donées réussie'))
  .catch((error) => {
    console.error(error.message + process.env.PASSWORD);
  });

//suppression des images
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
