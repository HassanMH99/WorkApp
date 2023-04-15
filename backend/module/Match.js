const mongoose = require('mongoose');
const {v4:uuidv4} = require('uuid')
const matchSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4,
    unique: true
  },
  workerId: {
    type: String,
    required: true,
    ref: 'Worker'
  },
  companyId: {
    type: String,
    required: true,
    ref: 'Company'
  }
});

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;
