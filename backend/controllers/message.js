const { Message } = require('../models');
const jwt = require('jsonwebtoken');



exports.createMessage = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const verify = jwt.verify(token, process.env.token);
  const userId = verify.userId;
  Message.create({
    title: req.body.newTitle,
    message: req.body.newMsg,
    userId: userId,
    imgUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  })
    .then(() => (res.status(201).json({ message: 'Message created' }) & console.log(userId)));
};

exports.getMessage = (req, res, next) => {
  Message.findAll({order: [['createdAt', 'DESC']]}) 
    .then(message => res.status(200).json(message))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneMessage = (req, res, next) => {
  Message.findOne({ id: req.params.id })
    .then(msg => res.status(200).json(msg))
    .catch(error => res.status(404).jsons({ error }));
};

exports.modifyMessage = (req, res, next) => {
  Message.updateOne({ id: req.params.id }, { ...req.body, id: req.params.id })
    .then(() => res.status(200).json({ message: 'Message Modifié' }))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteMessage = (req, res, next) => {
  Message.deleteOne({ id: req.params.id })
    .then(() => res.status(200).json({ message: 'Message Supprimé' }))
    .catch(error => res.status(400).json({ error }));
};

