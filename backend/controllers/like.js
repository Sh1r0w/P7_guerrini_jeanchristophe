const { like } = require('../models');
const { Message } = require('../models');
const jwt = require('jsonwebtoken');



exports.likeCreate = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const verify = jwt.verify(token, process.env.token);
  const userId = verify.userId;
  like.findOne({where: { MessageId: req.params.id, userId: userId}} )
  .then(reponse => {
    if (reponse != null && userId == reponse.userId){
      if(req.body.liked == reponse.liked || req.body.disliked == reponse.disliked){
        if(reponse.liked == 1){
          Message.decrement(['like'], {where: { id: req.params.id}})
        }else if(reponse.disliked == 1){
          Message.decrement(['dislike'], {where: { id: req.params.id}})
        }
      like.destroy({where: { id: reponse.id }})
      .then(() => res.status(200).json({ message: 'like retirer' }))
      .catch(error => res.status(400).json({ error }));
    }
  }else{
    like.create({
      liked: req.body.liked,
      disliked: req.body.disliked,
      MessageId: req.params.id,
      userId: userId,
  })
  .then(res.status(201).json({ message: 'Liked' }))
  if (req.body.liked == 1){
  Message.increment(['like'], {where: { id: req.params.id}})
}
  else if ( req.body.disliked == 1) {
    Message.increment(['dislike'], {where: { id: req.params.id}})
  }
  }
})
};

exports.lookLike = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const verify = jwt.verify(token, process.env.token);
  const userId = verify.userId;
like.findAll({where: {userId: userId}})
.then( reponse => (res.status(200).json(reponse)))
.catch(error => res.status(400).json({ error }))
}