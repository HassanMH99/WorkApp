const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
//   id: {
//     type: String,
//     required: true,
//     unique: true
//   },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['worker', 'company']
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
