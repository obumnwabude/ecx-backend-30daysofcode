const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const sgpa = require('./sgpa');
const port = 3000 || process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false}));

app.post('/createdata', (req, res) => {
  try {
    fs.writeFile('courses.json', JSON.stringify({sgpa: sgpa(JSON.parse(req.body.courses))}), err => {
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
    fs.readFile('courses.json', (err, courses) => {
      if (err) {
        res.status(200).json([]);
        return;
      }
      res.status(200).json(JSON.parse(courses));
    });
  } catch(error) {
    res.status(400).end();
  }
});

module.exports = app.listen(port);