const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs')
const port = 3000 || process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true}));
app.use('/', express.static('public'));

app.post('/signup', (req, res) => {
  try {
    if (fs.existsSync('users.json')) {
      fs.readFile('users.json', (err, users) => {
        if (err) return res.status(401).json(err);
        users = JSON.parse(`[${users}]`);
        let user = users.find(one => one.email === req.body.email);
        if (user) {
          return res.status(201).json({
            message: 'user exists already', 
            email: user.email,
            username: user.username
          });
        } else {
          fs.appendFile('users.json', `,${JSON.stringify(req.body)}`, err => {
            if (err) return res.status(401).json(err);
            res.status(201).json({
              message: 'user created successfully', 
              email: req.body.email,
              username: req.body.username
            });
          });
        }
      });
    } else { 
      fs.writeFile('users.json', JSON.stringify(req.body), err => {
        if (err) return res.status(401).json(err);
        res.status(201).json({
          message: 'user created successfully', 
          email: req.body.email,
          username: req.body.username
        });
      });
    }
  } catch(error) {
    res.status(401).json(error);
  }
});

app.post('/login', (req, res) => {
  try {
    if (fs.existsSync('users.json')) { 
      fs.readFile('users.json', (err, users) => {
        if (err) return res.status(401).json(err);
        users = JSON.parse(`[${users}]`);
        let user = users.find(one => one.email === req.body.email);
        if (user) {
          return res.status(201).json({
            message: 'login successful',
            email: user.email,
            username: user.username
          });
        } else {
          res.status(201).json({message: 'user not found, please sign up'});
        } 
      });
    } else { 
      res.status(201).json({message: 'no user found, sign up instead'});
    }
  } catch(error) {
    res.status(401).json(error);
  }
});

module.exports = app.listen(port);