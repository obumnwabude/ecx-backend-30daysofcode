const Store = require('../models/store');
const User = require('../models/store');

module.exports = (req, res, next) => {
  // retrieve store in database
  Store.findOne({_id: req.params.id})
    .then(async store => {
      // if no store was found return 
      if (!store) {
        return res.status(400).json({message: `Store with _id: ${req.params.id} not found.`});
      } else {
        // retrieve user with userId in store 
        let user;
        try {
          user = await User.findOne({_id: store.userId});
        } catch {
          return res.status(500).json(error);
        }
        // check if no user was found and return 
        if (!user) {
          return res.status(400).json({
            message: `Can't access the store with store _id: ${req.params.id} because its creator with userId: ${store.userId} was not found.`
          });
        } else {
          // save user and store on res.locals 
          res.locals.store = store;
          res.locals.user = user;
          // pass execution to next function
          next();
        }
      }
    }).catch(error => {
      if (error.name === 'CastError') 
        return res.status(400).json({message: `Invalid Store ID: ${req.params.id} in URL`});
      res.status(500).json(error);
    });
};