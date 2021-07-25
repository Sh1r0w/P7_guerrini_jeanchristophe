const express = require('express');
const router = express.Router();

const msgCtrl = require('../controllers/message');
const auth = require('../middleware/auth');

router.post('/newMsg', auth, msgCtrl.createMessage);
router.use('/', auth, msgCtrl.getMessage);
router.get('/:id', auth, msgCtrl.getOneMessage);

  module.exports = router;