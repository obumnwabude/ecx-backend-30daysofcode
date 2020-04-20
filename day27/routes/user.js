const router = require('express').Router();
const userCtrl = require('../controllers/user');

router.get('/', userCtrl.getAllUsers);
router.post('/', userCtrl.createUser);

module.exports = router;
