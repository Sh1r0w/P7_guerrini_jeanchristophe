const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const likeCtrl = require('../controllers/like');

//route pour les likes
router.post('/likeMessage/:id', auth, likeCtrl.likeCreate);
router.get('/looklike', auth, likeCtrl.lookLike);
module.exports = router;