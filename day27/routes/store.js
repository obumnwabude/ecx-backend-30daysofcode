const router = require('express').Router();
const storeCtrl = require('../controllers/store');
const storeId = require('../middleware/store-id');

router.get('/', storeCtrl.getAllStores);
router.get('/:id', storeId, storeCtrl.getStore);

module.exports = router;