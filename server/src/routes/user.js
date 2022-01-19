var express = require('express');
var router = express.Router();

const UserController = require('../app/controllers/UserController');

router.post('/create', UserController.create);
router.post('/login', UserController.login);
router.get('/finduser/:fullname', UserController.findUsers);
router.get('/findone/:username',UserController.findUserByUserName);

module.exports = router;