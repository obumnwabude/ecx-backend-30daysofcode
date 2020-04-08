const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs')
const port = 3000 || process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false}));

app.post('/createdata', (req, res) => {
  const words = req.body.words.substr(1).slice(0, -1).split(',')
  .map(str => str.trim())
  .filter(str => str === str.split('').reverse().join(''));
  try {
    fs.writeFile('words.json', JSON.stringify({words: words}), err => {
      if (err) {
        res.status(401).json({success:false});
        return;
      }
      res.status(201).json({success:true});
    });
  } catch(error) {
    res.status(401).end();
  }
});

app.get('/getdata', (req, res) => {
  try {
    fs.readFile('words.json', (err, words) => {
      if (err) {
        res.status(200).json([]);
        return;
      }
      res.status(200).json(JSON.parse(words));
    });
  } catch(error) {
    res.status(400).end();
  }
});

module.exports = app.listen(port);