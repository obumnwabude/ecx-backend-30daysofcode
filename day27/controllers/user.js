const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getUser = (req, res, next) => {
  // the user from res.locals 
  const user = res.locals.user;
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber,
    userType: user.userType,
    dateCreated: user.dateCreated,
    lastLogin: user.lastLogin,
    verified: user.verified,
    addresses: user.addresses
  });
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
          // check if email is not unique and return proper message
          if (error.name === 'ValidationError') {
            return res.status(401).json({message:`User with email: ${req.body.email} exists already, use another email to sign up`});
          } 
          res.status(500).json(error);
        });
    }).catch(error => res.status(500).json(error));
};

exports.loginUser = (req, res, next) => {
  // ensure that email and password for login were found in body else return
  if (!(req.body.email)) 
    return res.status(401).json({message: 'Please provide a valid email'});
  if (!(req.body.password)) 
    return res.status(401).json({message: 'Please provide a valid password'});

  // get user with provided email from database
  User.findOne({email: req.body.email})
    .then(user => {
      // user was not found return 
      if (!user) {
        return res.status(401).json({message: `User with email: ${req.body.email} not found. Check again or sign up`});
      } else {
        // if user was found, compare passwords
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            // if passwords don't match return 
            if (!valid) {
              return res.status(401).json({message: 'Wrong password'});
            } else {
              // update login time on user 
              user.lastLogin = new Date();
              user.save().then(() => {
                // if passwords match, sign token with email and return
                const token = jwt.sign({email: user.email}, 'random', {expiresIn: '3h'});
                res.status(201).json({
                  message: 'Login Successful',
                  _id: user._id,
                  email: user.email,
                  token: token
                });
              }).catch(error => res.status(500).json(error));
            }
          }).catch(error => res.status(500).json(error));
      }
    }).catch(error => res.status(500).json(error));
};

exports.updateUser = async (req, res, next) => {
  // get user to be updated from res.locals 
  const user = res.locals.user;
  // check and ensure that there is something to be updated in the user from request body
  if (!(req.body.name || req.body.email || req.body.phoneNumber || req.body.password
   || req.body.userType || req.body.verified || req.body.addresses)) { 
    return res.status(401).json({
      message: 'Please provide valid name, email, phoneNumber, passsword, userType, verified or addresses to update with'
    });
  }
    
  // update with the provided body data
  if (req.body.name) user.name = req.body.name;
  if (req.body.email) user.email = req.body.email;
  if (req.body.phoneNumber) user.phoneNumber = req.body.phoneNumber;
  if (req.body.password) {
    try {
      user.password = await bcrypt.hash(req.body.password, 10);
    } catch(error) {
      res.status(500).json(error);
    }
  }
  if (req.body.userType) {
    if (req.body.userType.toUpperCase() !== 'USER' || req.body.userType.toUpperCase() !== 'ADMIN') {
      return res.status(401).json({message: 'userType can only be \'USER\' or \'ADMIN\''});
    } else {
      user.userType = req.body.userType;
    }
  }
  if (req.body.verified) user.verified = req.body.verified;
  if (req.body.addresses) user.addresses = user.addresses.concat(req.body.addresses);

  
  user.save().then(updated => {
    res.status(201).json({
      message: 'Update Successful',
      _id: updated._id,
      name: updated.name,
      email: updated.email,
      phoneNumber: updated.phoneNumber,
      userType: updated.userType,
      verified: user.verified,
      addresses: user.addresses
    });
  }).catch(err => {
    // check if email is not unique and return proper message
    if (error.name === 'ValidationError') {
      return res.status(401).json({message:`User with email: ${req.body.email} exists already, use another email to update user`});
    } 
    res.status(500).json(error);
  });
};