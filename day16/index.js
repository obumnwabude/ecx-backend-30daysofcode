const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs')
const port = 3000 || process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true}));
app.use('/', express.static('public'));

app.post('/signup', (req, res) => {
  try {
    fs.writeFile('users.json', JSON.stringify(req.body), err => {
      if (err) {
        res.status(401).json(err);
        return;
      }
      res.status(201).json(req.body);
    });
  } catch(error) {
    res.status(401).json(error);
  }
});

app.post('/login', (req, res) => {
  try {
    fs.readFile('users.json', (err, user) => {
      if (err) {
        res.status(401).json(err);
        return;
      }
      const data = {
        signup: JSON.parse(user),
        login: req.body
      }
      res.status(201).json(data);
    });
  } catch(error) {
    res.status(401).json(error);
  }
});

module.exports = app.listen(port);