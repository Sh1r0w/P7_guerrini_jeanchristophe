const { Reponse } = require('../models');
const { Message } = require('../models');
const jwt = require('jsonwebtoken');

exports.createReponse = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const verify = jwt.verify(token, process.env.token);
    const userId = verify.userId;
    if (req.file == undefined) {
        Reponse.create({
        reponse: req.body.reponse,
        userId: userId,
        MessageId: req.params.id
      })
        .then(() => (res.status(201).json({ message: 'Message created' }) & console.log(req.file)));
      
    }else {
    Reponse.create({
        reponse: req.body.reponse,
        userId: userId,
        MessageId: req.params.id,
        imgUrlReponse: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
      .then(() => (res.status(201).json({ message: 'Message & Media created' }) & console.log(req.file)));
    }
    Message.increment(['reponse'], {where: { id: req.params.id}})
  };

  exports.allReponse = (req, res, next) => {
    Reponse.findAll({where: {Messageid: req.params.id}, order: [['createdAt', 'DESC']]}) 
      .then(message => res.status(200).json(message))
      .catch(error => res.status(400).json({ error }));
  };

  exports.deleteRep = (req, res, next) => {
    Reponse.findOne({where: {id: req.params.id}})
    .then(response => {
    if(req.body.images == null){
      Reponse.destroy({where: { id: req.params.id }})
      .then(() => res.status(200).json({ message: 'Message Supprimé' }))
      .catch(error => res.status(400).json({ error }));
    }else{
    
      const filename = response.imgUrlReponse.split('/images/')[1];
      fs.unlink(`images/${filename}`, () =>{
        Reponse.destroy({where: { id: req.params.id }})
        .then(() => res.status(200).json({ message: 'Reponse Supprimé' }))
        .catch(error => res.status(400).json({ error }));
      })
    }
    Message.decrement(['reponse'], {where: { id: response.MessageId}})
    })
    .catch(error => res.status(400).json({ error }))
    
  };