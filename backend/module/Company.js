const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    id: {
      type: String,
      required: true,
      unique: true
    },
    userId: {
      type: String,
      required: true,
      ref: 'User'
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    website: {
      type: String,
      required: true
    },
    industry: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    jobs: [jobSchema]
  });
  
  const Company = mongoose.model('Company', companySchema);
  
  module.exports = Company;