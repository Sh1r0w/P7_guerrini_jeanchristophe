const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const userCtrl = require('../controllers/user');

//Route pour les appels utilisateurs
router.post('/registration', userCtrl.signup);
router.post('/', userCtrl.login);
router.get('/user', auth, userCtrl.getUser);
router.get('/alluser', auth, userCtrl.getAllUser);
router.post('/modifyUser', auth, userCtrl.modifyUser);
router.post('/deleteUser', auth, userCtrl.deleteUser);

module.exports = router;