const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const Logger = require('./models/logger');
const port = process.env.PORT || 3000;

// connect to mongodb
mongoose.connect('mongodb+srv://obum:24PFP3g7v6idbhcM@cluster0-kfvs4.gcp.mongodb.net/ecxbackend-wolverstore', 
  {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('Successfully connected to MongoDB!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB!');
    console.error(error);
  });

// a logger to save logs to database
const logStream = { 
  write: line => {
    const logger = new Logger({log: line});
    logger.save().catch(err => console.log(err));
  }
};

// morgan middleware for logging
app.use(morgan(':method :url :status :response-time ms', {stream: logStream}));

app.get('/', (req, res) => {
  res.status(200).send('server working');
});

app.get('/logs', (req, res) => {
  Logger.find({}).then(logs => {
    res.format({
      'text/plain': () => res.status(200).send(logs.map(log => log.log).join(''))
    });
  }).catch(err => res.status(500).json(err));
})

module.exports = app.listen(port);