const Cart = require('../models/cart');

module.exports = (req, res, next) => {
  // retrieve cart in database
  Cart.findOne({_id: req.params.id})
    .then(cart => {
      // if no cart was found return 
      if (!cart) {
        return res.status(400).json({message: `Cart with _id: ${req.params.id} not found.`});
      } else {
        // save cart on res.locals 
        res.locals.cart = cart;
        // pass execution to next function
        next();
      }
    }).catch(error => {
      if (error.name === 'CastError') 
        return res.status(400).json({message: `Invalid Cart ID: ${req.params.id}`});
      return res.status(500).json(error);
    });
};