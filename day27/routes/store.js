const router = require('express').Router();
const storeCtrl = require('../controllers/store');

router.get('/', storeCtrl.getAllStores);

module.exports = router;