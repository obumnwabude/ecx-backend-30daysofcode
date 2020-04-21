const router = require('express').Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

router.get('/:id', auth, userCtrl.getUser);
router.post('/', userCtrl.createUser);
router.post('/login', userCtrl.loginUser);

module.exports = router;
