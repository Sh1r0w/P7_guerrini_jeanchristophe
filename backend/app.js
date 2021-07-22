const express = require('express');

const app = express();
require('dotenv').config();
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const cors = require('cors');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql' 
  });


  
app.use(cors())

  app.use(bodyParser.json());

  app.post('/message/newMsg', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
      message: 'Objet créé !'
    });
  });

  app.post('/registration', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
      message: 'Objet créé !'
    });
  });

  app.post('/', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
      message: 'Objet créé !'
    });
  });

app.post('/api/registration', (req, res, next) => {
  console.log(req.body)
});

module.exports = app;