const { Message } = require('../models');
const { like } = require('../models');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const validator = require('validator');

exports.createMessage = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const verify = jwt.verify(token, process.env.token);
  const userId = verify.userId;
  if (req.file == undefined) {
    Message.create({
      title: validator.blacklist(req.body.newTitle, '+=$;'),
      message: validator.blacklist(req.body.newMsg, '+=$;'),
      userId: userId,
    })
      .then(() => (res.status(201).json({ message: 'Message created' }) & console.log(req.file)));
    
  }else {
  Message.create({
    title: validator.blacklist(req.body.newTitle, '+=$;'),
    message: validator.blacklist(req.body.newMsg, '+=$;'),
    userId: userId,
    imgUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  })
    .then(() => (res.status(201).json({ message: 'Message & Media created' }) & console.log(req.file)));
  }
};

exports.getMessage = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const verify = jwt.verify(token, process.env.token);
  const userId = verify.userId;
  Message.findAll({include: [{model: like, where: {userId: userId}, required: false}], order: [['createdAt', 'DESC']]}) 
    .then(message => res.status(200).json(message))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneMessage = (req, res, next) => {
  Message.findOne({where: { id: req.params.id }})
    .then(msg => res.status(200).json(msg))
    .catch(error => res.status(404).json({ error }));
};

exports.modifyMessage = (req, res, next) => {
  Message.findOne({where: { id: req.params.id }})
  .then(message => { 
    
    if(req.body.images == 0){
    Message.findOne({where: { id: req.params.id }})
      .then(function (modify) { return modify.update({ 
        title: req.body.newTitle,
        message: req.body.newMsg,
      })})
      .catch(error => res.status(400).json({ error }) & console.log(req.params));
  }else if(Message.imgUrl == null){
    Message.findOne({where: { id: req.params.id }})
    .then(function (modify) { return modify.update({ 
      title: req.body.newTitle,
      message: req.body.newMsg,
      imgUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
     })})
    .catch(error => res.status(400).json({ error }));
  }
  else{
    const filename = message.imgUrl.split('/images/')[1];
    fs.unlink(`images/${filename}`, () =>{
      Message.findOne({where: { id: req.params.id }})
      .then(function (modify) { return modify.update({ 
        title: req.body.newTitle,
        message: req.body.newMsg,
        imgUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
       })})
      .catch(error => res.status(400).json({ error }));
      
    });
  }
  })
  .catch(error => res.status(500).json({ error }))
  
};

exports.deleteMessage = (req, res, next) => {
  Message.findOne({where: { id: req.params.id }})
  .then(message => {
    if(req.body.images == null){
      Message.destroy({where: { id: req.params.id }})
      .then(() => res.status(200).json({ message: 'Message Supprimé' }))
      .catch(error => res.status(400).json({ error }));
    }else{
      const filename = message.imgUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () =>{
        Message.destroy({where: { id: req.params.id }})
        .then(() => res.status(200).json({ message: 'Message Supprimé' }))
        .catch(error => res.status(400).json({ error }));
      })

    }
  })
    .catch(error => res.status(500).json({ error }))
};

