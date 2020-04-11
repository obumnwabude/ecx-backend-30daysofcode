const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/ecxbackend', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('Successfully connected to MongoDB!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB!');
    console.error(error);
  });

module.exports = mongoose.model('User', new mongoose.Schema({
  email: String,
  username: String,
  password: String,
  date: String,
  time: String
}));
