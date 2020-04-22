const Cart = require('../models/cart');

exports.createCart = (req, res, next) => {
  // obtain user, store and product from cart
  const user = res.locals.user;
  const store = res.locals.store;
  const products = res.locals.products;

  // get return products
  const returnProducts = [];
  products.forEach(product => returnProducts.push({
    productId: product._id,
    storeId: store._id,
    name: product.name,
    quantity: product.quantity,
    price: product.price
  }));

  // make the cart 
  const cart = new Cart({
    userId: user._id,
    products: returnProducts
  });

  // save and return 
  cart.save().then(() => res.status(201).json({
    message: 'Cart successfully created',
    cart: cart
  })).catch(error => res.status(500).json(error));
};

exports.getCart = (req, res, next) => {
  res.status(200).json(res.locals.cart);
};