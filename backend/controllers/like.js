const { like } = require('../models');
const jwt = require('jsonwebtoken');



exports.likeCreate = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const verify = jwt.verify(token, process.env.token);
  const userId = verify.userId;
  like.findOne({where: { MessageId: req.params.id, userId: userId}} )
  .then(reponse => {
    if (reponse != null && userId == reponse.userId){
      if(req.body.liked == reponse.liked){
      console.log('user already liked')
    }
  }else{
    like.create({
      liked: req.body.liked,
      disliked: req.body.disliked,
      MessageId: req.params.id,
      userId: userId,
  })
  .then(res.status(201).json({ message: 'Liked' }))
  }
})
};

exports.allLike = (req, res, next) => {
  like.findAll() 
  .then(message => res.status(200).json(message))
  .catch(error => res.status(400).json({ error }));
};
