const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => { 
  // retrieve the user from the database 
  User.findOne({_id: req.params.id})
    .then(user => {
      // check if there's no valid user with the provided id, return
      if (!user) {
        // if so return message that user with specified id was not found
        return res.status(400).json({message: `User with _id: ${req.params.id}, not found!`});
      } else { 
        // if there's a user, check the authorization for token matching
        try {
          // get the token from request headers
          const token = req.headers.authorization.split(' ')[1];
          const decodedToken = jwt.verify(token, 'random');
          if (decodedToken.email === user.email) { 
            // assign the user to res.locals for access in next functions
            res.locals.user = user;
            // pass execution to next action
            next();
          } else {
            throw new Error('Invalid Request');
          }
        } catch(error) {
          if (error.name === 'TokenExpiredError') {
            return res.status(400).json({
              message: 'Session expired, please login again'
            });
          } else {
            return res.status(400).json({message: 'Invalid Request'});
          }
        }
      }
    }).catch(error => {
      if (error.name === 'CastError') 
        return res.status(400).json({message: 'Invalid User ID in URL'});
      res.status(500).json(error);
    });
};