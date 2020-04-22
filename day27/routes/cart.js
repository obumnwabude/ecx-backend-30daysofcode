const router = require('express').Router();
const cartCtrl = require('../controllers/cart');
const auth = require('../middleware/auth');
const userId = require('../middleware/user-id');
const storeId = require('../middleware/store-id');
const cartProducts = require('../middleware/cart-products');

router.post('/', userId, auth, storeId, cartProducts, cartCtrl.createCart);

module.exports = router;