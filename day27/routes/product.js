const router = require('express').Router();
const productCtrl = require('../controllers/product');
const productId = require('../middleware/product-id');

router.get('/', productCtrl.getAllProducts);
router.get('/:id', productId, productCtrl.getProduct);

module.exports = router;