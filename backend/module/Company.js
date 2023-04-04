const mongoose = require('mongoose');
const jobSchema = new mongoose.Schema({
    //   id: {
    //     type: String,
    //     required: true,
    //     unique: true
    //   },
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
    // id: {
    //   type: String,
    //   required: true,
    //   unique: true
    // },
    // userId: {
    //   type: String,
    //   required: true,
    //   ref: 'User'
    // },
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
    location: {
      type: String,
      required: true
    },
  jobs: [jobSchema]
  });
  
  const Company = mongoose.model('Company', companySchema);
  
  module.exports = Company;