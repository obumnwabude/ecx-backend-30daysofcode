const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const addressSchema = new mongoose.Schema({
  street: String,
  state: Number, 
  city: String, 
  zipcode: String, 
  country: String
});

module.exports = mongoose.model('User', new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: String,
  password: { type: String, required: true },
  userType: {
    type: String,
    enum: ['USER', 'ADMIN'],
    default: 'USER'
  },
  dateCreated: { type: Date, default: new Date() },
  lastLogin: { type: Date, default: new Date() },
  verified: Boolean,
  addresses: [addressSchema]
}).plugin(uniqueValidator));
