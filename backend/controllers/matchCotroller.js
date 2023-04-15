const Match = require('../module/Match')
const Worker = require('../module/worker')
const Company = require('../module/Company')
exports.createMatch = async (req, res) => {
    const { workerId, companyId } = req.body;
  
    try {
      // Check if the worker and company exist
      const workerExists = await Worker.findOne({ userId: workerId });
      const companyExists = await Company.findOne({ userId: companyId });
        console.log(workerExists);
        console.log(companyExists);
      if (!workerExists) {
        return res.status(404).json({ message: 'Worker not found' });
      }
  
      if (!companyExists) {
        return res.status(404).json({ message: 'Company not found' });
      }
  
      // Check if there is already a match for this worker and company
      const existingMatch = await Match.findOne({ workerId, companyId });
  
      if (existingMatch) {
        return res.status(400).json({ message: 'Match already exists' });
      }
  
      // Create the match
      const match = new Match({ workerId, companyId });
      const savedMatch = await match.save();
  
      res.status(201).json(savedMatch);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };