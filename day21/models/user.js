const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

mongoose.connect('mongodb://127.0.0.1:27017/ecxbackend', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('User Successfully connected to MongoDB!');
  })
  .catch((error) => {
    console.log('User Unable to connect to MongoDB!');
    console.error(error);
  });

module.exports = mongoose.model('User', new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  names: [String],
  occupation: String,
  lastlogin: { type: String, required: true }
}).plugin(uniqueValidator));
