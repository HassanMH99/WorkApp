const mongoose = require('mongoose');
const {v4:uuidv4} = require('uuid')
const jobSchema = new mongoose.Schema({
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      skills: {
        type: [String],
        required: true
      }
    });
const companySchema = new mongoose.Schema({
    userId: {
      type: String,
      required: true,
      ref: 'User',
      unique:true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true
    },
    website: {
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