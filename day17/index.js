const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const bcrypt = require('bcrypt');
const dateTime = require('./date-time');
const port = 3000 || process.env.PORT;

app.use(bodyParser.json());

// handle signup
app.post('/signup', (req, res) => {
  try {
    // check if the users file for storing exist
    if (fs.existsSync('users.json')) {
      // if so check if there is a user with the given email or username
      fs.readFile('users.json', (err, users) => {
        if (err) return res.status(401).json(err);
        users = JSON.parse(`[${users}]`);
        const userEmail = users.find(one => one.email === req.body.email);
        const userUsername = users.find(one => one.username === req.body.username);
        let user = userEmail || userUsername;
        // if so return the found user
        if (user) {
          let returnMessage;
          userEmail ? returnMessage = 'User with the given email exists already': 
              userUsername ? returnMessage = 'User with the given username exists already' : false;
          return res.status(401).json({
            message: returnMessage, 
            email: user.email,
            username: user.username
          });
        } else {
          // if not create a new user
          // hash the password
          bcrypt.hash(req.body.password, 10, (err, hashed) => {
            if (err) return res.status(401).json(err);
            user = {
              email: req.body.email,
              username: req.body.username,
              password: hashed,
              date: dateTime.date(),
              time: dateTime.time()
            };
            // store the user and return it
            fs.appendFile('users.json', `,${JSON.stringify(user)}`, err => {
              if (err) return res.status(401).json(err);
              return res.status(201).json({
                message: 'user created successfully', 
                email: user.email,
                username: user.username
              });
            });
          });
        }
      });
    } else { 
      // if not create a new user 
      // hash the password
      bcrypt.hash(req.body.password, 10, (err, hashed) => {
        if (err) return res.status(401).json(err);
        user = {
          email: req.body.email,
          username: req.body.username,
          password: hashed,
          date: dateTime.date(),
          time: dateTime.time()
        };
        // store the user and return it
        fs.writeFile('users.json', JSON.stringify(user), err => {
          if (err) return res.status(401).json(err);
          return res.status(201).json({
            message: 'user created successfully', 
            email: user.email,
            username: user.username
          });
        });
      });
    }
  } catch(error) {
    res.status(401).json(error);
  }
});

app.post('/login', (req, res) => {
  try {
    // check if the users file for storage exists
    if (fs.existsSync('users.json')) { 
      // if so check if the user exists
      fs.readFile('users.json', (err, users) => {
        if (err) return res.status(401).json(err);
        users = JSON.parse(`[${users}]`);
        let user = users.find(one => one.email === req.body.email || one.username === req.body.username);
        if (user) {
          // if so compare passwords 
          bcrypt.compare(req.body.password, user.password, (err, valid) => {
            if (err) return res.status(401).json(err);
            // if passwords match return succesful login message
            if (valid) { 
              return res.status(201).json({
                message: 'login successful',
                email: user.email,
                username: user.username
              });
            } else { 
            // else return message of wrong password
              return res.status(401).json({message: 'wrong password, please login with correct password'});
            }
          });
        } else {
          // if not return message of user not found
          res.status(401).json({message: 'user not found, please sign up'});
        } 
      });
    } else { 
      // if not return a message to sign up
      res.status(401).json({message: 'no user found, sign up instead'});
    }
  } catch(error) {
    res.status(401).json(error);
  }
});

module.exports = app.listen(port);