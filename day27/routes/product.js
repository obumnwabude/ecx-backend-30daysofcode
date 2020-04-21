const router = require('express').Router();
const productCtrl = require('../controllers/product');
const auth = require('../middleware/auth');
const storeId = require('../middleware/store-id');
const productId = require('../middleware/product-id');


router.get('/', productCtrl.getAllProducts);
router.post('/', storeId, auth, productCtrl.createProduct);
router.get('/:id', productId, productCtrl.getProduct);

module.exports = router;