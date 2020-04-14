const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/ecxbackend', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('Logger Successfully connected to MongoDB!');
  })
  .catch((error) => {
    console.log('Logger Unable to connect to MongoDB!');
    console.error(error);
  });

module.exports = mongoose.model('Logger', new mongoose.Schema({logs: String}));
