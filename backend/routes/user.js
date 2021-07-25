const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/registration', userCtrl.signup);
router.post('/', userCtrl.login);

module.exports = router;