const Product = require('../models/product');

exports.getAllProducts = (req, res, next) => {
  Product.find({})
    .then(products => res.status(200).json({products: products}))
    .catch(error => res.status(500).json(error));
};

exports.createProduct = (req, res, next) => {
  // ensures that at least name, quantity, price and description, are provided
  if (!(req.body.name)) 
    return res.status(401).json({message: 'Please provide a valid name'});
  else if (!(req.body.quantity))
    return res.status(401).json({message: 'Please provide a valid quantity'});
  else if (!(req.body.price))
    return res.status(401).json({message: 'Please provide a valid price'});
  else if (!(req.body.description))
    return res.status(401).json({message: 'Please provide a valid description'});

  // check if numeric attributes are numbers else return
  // for price
  if (req.body.price) {
    if (isNaN(req.body.price)) {
      return res.status(401).json({message: 'The price must be a numeric value'});
    } else if (req.body.price < 1) {
      return res.status(401).json({message: 'The price must be greater than 1'});
    }
  }
  // for quantity
  if (req.body.quantity) {
    if (isNaN(req.body.quantity)) {
      return res.status(401).json({message: 'The quantity must be a numeric value'});
    } else if (req.body.quantity < 1) {
      return res.status(401).json({message: 'The quantity must be greater than 1'});
    }
  }
  // for discountPrice
  if (req.body.discountPrice) {
    if (isNaN(req.body.discountPrice)) {
      return res.status(401).json({message: 'The discountPrice must be a numeric value'});
    } else if (req.body.discountPrice < 1) {
      return res.status(401).json({message: 'The discountPrice must be greater than 1'});
    }
  }
  // for inStock
  if (req.body.inStock) {
    if (isNaN(req.body.inStock)) {
      return res.status(401).json({message: 'The inStock must be a numeric value'});
    } else if (req.body.inStock < 1) {
      return res.status(401).json({message: 'The inStock must be greater than 1'});
    }
  }

  // create the store
  const product = new Product({
    storeId: res.locals.store._id,
    name: req.body.name,
    quantity: req.body.quantity,
    price: req.body.price,
    description: req.body.description,
    discountPrice: req.body.discountPrice || 0,
    images: req.body.images || {
      thumbnail: '',
      front: '',
      back: '',
      left: '',
      right: '',
      up: '',
      down: ''
    },
    category: req.body.category || '',
    inStock: req.body.inStock || 1,
    variations: req.body.variations || []
  });

  // save the store and return it
  product.save()
    .then(() => res.status(201).json({
      message: 'Product successfully created',
      product: product 
    })).catch(error => res.status(500).json(error));
};

exports.getProduct = (req, res, next) => {
  res.status(200).json(res.locals.product);
};