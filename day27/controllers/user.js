const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.getAllUsers = (req, res, next) => {
  User.find({}).then(users => {
    res.status(200).json({
      users: users.map(user => {
        return {
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber
        }
      })
    });
  }).catch(error => res.status(400).json(error));
};

exports.createUser = (req, res, next) => {
  // ensures that at least name, email, and password are provided
  if (!(req.body.name)) 
    return res.status(401).json({message: 'Please provide a valid name'});
  else if (!(req.body.email))
    return res.status(401).json({message: 'Please provide a valid email'});
  else if (!(req.body.password))
    return res.status(401).json({message: 'Please provide a password'});

  // hash the password from req.body 
  bcrypt.hash(req.body.password, 10)
    .then(hashed => {
      // create a new user
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber || '',
        password: hashed,
        addresses: req.body.addresses || []
      });
      if (req.body.userType) user.userType = req.body.userType;
      if (req.body.verified) user.verified = req.body.verified;
      // save and return the user
      user.save()
        .then(() => res.status(201).json({
          message: 'User successfully created!',
            _id: user._id,
            name: user.name,
            email: user.email
        })).catch(error => {
          // check if email or phoneNumber are not unique and return proper message
          if (error.name === 'ValidationError') {
            return res.status(401).json({message:`User with email: ${req.body.email} exists already, use another email to sign up`});
          } 
          res.status(500).json(error);
        });
    }).catch(error => res.status(500).json(error));
};