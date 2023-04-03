const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  cv: {
    type: String,
    required: true
  }
});

const Worker = mongoose.model('Worker', workerSchema);

module.exports = Worker;
