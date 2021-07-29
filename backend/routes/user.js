const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const userCtrl = require('../controllers/user');

router.post('/registration', userCtrl.signup);
router.post('/', userCtrl.login);
router.get('/user', auth, userCtrl.getUser);
router.post ('/deleteUser', auth, userCtrl.deleteUser);
module.exports = router;