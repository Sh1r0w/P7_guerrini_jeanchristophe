const { Message } = require('../models');

exports.createMessage =  (req, res, next) => {
    delete req.body.id;
    Message.create({
      title: req.body.newTitle,
      message: req.body.newMsg,
    })
    .then(()=> (res.status(201).json({ message: 'Message created' })));
  };

  exports.getMessage = (req, res, next) => {
    Message.findAll()
    .then(message => res.status(200).json(message))
    .catch(error => res.status(400).json({ error }));
  };

  exports.getOneMessage = (req, res, next) => {
    Message.findOne({ id: req.params.id})
    .then(msg => res.status(200).json(msg))
    .catch(error => res.status(404).jsons ({ error }));
  }