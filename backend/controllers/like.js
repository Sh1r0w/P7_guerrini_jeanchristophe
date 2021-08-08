const { like } = require('../models');
const jwt = require('jsonwebtoken');



exports.likeCreate = (req, res, next) => {
    console.log(req.body)
  like.create({
      liked: req.body.liked,
      disliked: req.body.disliked,
      MessageID: req.body.MessageID,
      ReponseId: req.body.ReponseId,
      userId: req.body.userId,
  })
  .then(res.status(201).json({ message: 'Liked' }))
}