const User = require('../models/user');

module.exports = (req, res, next) => {
  // retrieve the user from the database 
  User.findOne({_id: req.params.id})
    .then(user => {
      // check if there's no valid user with the provided id, return
      if (!user) {
        // if so return message that user with specified id was not found
        return res.status(400).json({message: `User with _id: ${req.params.id}, not found!`});
      } else { 
        // assign the user to res.locals for access in next functions
        res.locals.user = user;
        // pass execution to next action
        next();
      }
    }).catch(error => {
      if (error.name === 'CastError') 
        return res.status(400).json({message: `Invalid User ID: ${req.params.id} in URL`});
      res.status(500).json(error);
    });
};