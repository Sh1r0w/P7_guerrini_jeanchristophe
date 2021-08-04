const { Reponse } = require('../models');
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
  };

  exports.allReponse = (req, res, next) => {
    Reponse.findAll({where: {Messageid: req.params.id}, order: [['createdAt', 'DESC']]}) 
      .then(message => res.status(200).json(message))
      .catch(error => res.status(400).json({ error }));
  };

  exports.deleteRep = (req, res, next) => {
    Reponse.destroy({where: { id: req.params.id }})
      .then(() => res.status(200).json({ message: 'Reponse Supprimé' }))
      .catch(error => res.status(400).json({ error }));
  };