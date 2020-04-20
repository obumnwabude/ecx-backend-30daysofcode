const User = require('../models/user');

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