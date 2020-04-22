const Cart = require('../models/cart');

exports.createCart = (req, res, next) => {
  // obtain user, store and product from cart
  const user = res.locals.user;
  const store = res.locals.store;
  const products = res.locals.products;

  // get return products
  let returnProducts = [];
  products.forEach(product => returnProducts.push({
    productId: product._id,
    storeId: store._id,
    name: product.name,
    quantity: product.quantity,
    price: product.price
  }));

  // test 
  res.status(201).json({
    buyerEmail: user.email,
    storeName: store.name,
    products: returnProducts
  });
};