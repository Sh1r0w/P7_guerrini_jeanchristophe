const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const { User } = require('./models');
const { Message } = require('./models');


app.use(cors())

  app.use(bodyParser.json());

  

  app.post('/message/newMsg', (req, res, next) => {
    delete req.body.id;
    Message.create({
      title: req.body.newTitle,
      message: req.body.newMsg,
    })
    .then(()=> (res.status(201).json({ message: 'Message created' })));
  });

  app.post('/registration', (req, res, next) => {
    delete req.body._id;
    User.create({ firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      email: req.body.mail,
     })
    .then(() => (res.status(201).json({ message: 'ok' })
    ))
  });

  app.use('/message', (req, res, next) => {
    Message.findAll()
    .then(message => res.status(200).json(message))
    .catch(error => res.status(400).json({ error }));
  });

  app.get('/message/:id', (req, res, next) => {
    Message.findOne({ _id: req.params.id})
    .then(msg => res.status(200).json(msg))
    .catch(error => res.status(404).jsons ({ error }));
  });

app.post('/api/registration', (req, res, next) => {
  console.log(req.body)
});

module.exports = app;