const express = require('express');
const router = express.Router();

const msgCtrl = require('../controllers/message');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


router.post('/newMsg', auth, multer, msgCtrl.createMessage);
router.get('/', auth, msgCtrl.getMessage);
router.get('/:id', auth, multer, msgCtrl.getOneMessage);
router.post('/modifyMsg/:id', auth, multer, msgCtrl.modifyMessage);
router.delete('/deleteMsg/:id', auth, msgCtrl.deleteMessage);

  module.exports = router;