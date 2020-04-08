const app = require('express')();
const bodyParser = require('body-parser');
const fs = require('fs')
const port = 3000 || process.env.PORT;

app.use(bodyParser.json());

app.post('/createdata', (req, res) => {
  try {
    fs.writeFile('data.json', JSON.stringify(req.body), err => {
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
    fs.readFile('data.json', (err, data) => {
      if (err) {
        res.status(200).json([]);
        return;
      }
      res.status(200).json(JSON.parse(data));
    });
  } catch(error) {
    res.status(400).end();
  }
});

module.exports = app.listen(port);