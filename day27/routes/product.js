const router = require('express').Router();
const productCtrl = require('../controllers/product');
const auth = require('../middleware/auth');
const storeId = require('../middleware/store-id');
const productId = require('../middleware/product-id');


router.get('/', productCtrl.getAllProducts);
router.post('/', storeId, auth, productCtrl.createProduct);
router.get('/:id', productId, productCtrl.getProduct);
router.put('/:id', productId, storeId, auth, productCtrl.updateProduct);
router.delete('/:id', productId, storeId, auth, productCtrl.deleteProduct);

module.exports = router;