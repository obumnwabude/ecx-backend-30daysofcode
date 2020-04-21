const Store = require('../models/store');

exports.getAllStores = (req, res, next) => {
  Store.find({})
    .then(stores => res.status(200).json({stores: stores}))
    .catch(error => res.status(500).json(error));
};

exports.getStore = (req, res, next) => {
  res.status(200).json(res.locals.store);
}