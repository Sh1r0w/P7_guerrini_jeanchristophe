const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const likeCtrl = require('../controllers/like');


router.post ('/likeMessage/:id', auth, likeCtrl.likeCreate);
router.get('/', auth, likeCtrl.allLike);

module.exports = router;