const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
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
