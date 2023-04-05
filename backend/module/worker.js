const mongoose = require('mongoose');
const {v4:uuidv4} = require('uuid')
const workerSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4,
        unique: true,
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
