const Product = require('../models/product');

exports.getAllProducts = (req, res, next) => {
  Product.find({})
    .then(products => res.status(200).json({products: products}))
    .catch(error => res.status(500).json(error));
};