const router = require('express').Router();
const userCtrl = require('../controllers/user');

router.post('/', userCtrl.createUser);
router.post('/login', userCtrl.loginUser);

module.exports = router;
