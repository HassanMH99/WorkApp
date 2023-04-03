const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  jobId: {
    type: String,
    required: true,
    ref: 'Job'
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
