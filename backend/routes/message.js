const express = require('express');
const router = express.Router();

const msgCtrl = require('../controllers/message');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


router.post('/newMsg', auth, multer, msgCtrl.createMessage);
router.use('/', auth, msgCtrl.getMessage);
router.get('/:id', auth, multer, msgCtrl.getOneMessage);
router.put('/modifyMsg', auth, multer, msgCtrl.modifyMessage);
router.delete('/deleteMsg', auth, msgCtrl.deleteMessage);

  module.exports = router;