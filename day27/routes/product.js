const router = require('express').Router();
const productCtrl = require('../controllers/product');

router.get('/', productCtrl.getAllProducts);

module.exports = router;