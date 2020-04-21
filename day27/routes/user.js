const router = require('express').Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const userId = require('../middleware/user-id');

router.get('/:id', userId, auth, userCtrl.getUser);
router.post('/', userCtrl.createUser);
router.post('/login', userCtrl.loginUser);
router.put('/:id', userId, auth, userCtrl.updateUser);
router.delete('/:id', userId, auth, userCtrl.deleteUser);

module.exports = router;
