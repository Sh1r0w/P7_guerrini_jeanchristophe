const express = require('express');
const router = express.Router();

const reponseCtrl = require('../controllers/reponse');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/:id', auth, multer, reponseCtrl.createReponse);
router.get('/id/:id', auth, multer, reponseCtrl.allReponse);
router.delete('/deletereponse/:id', auth, multer, reponseCtrl.deleteRep);

module.exports = router;