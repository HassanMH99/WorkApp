const multer = require('multer');
const Worker = require('../module/worker');
const User = require('../module/users');

const upload = multer({ dest: 'uploads/' }); // Multer configuration

// Create a new worker
const createWorker = async (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const { name, bio, skills } = req.body;
    const userId = req.params.userId;

    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const existingworker = await Worker.findOne({ userId: user._id });
      if (existingworker) {
        return res.status(400).json({ message: 'User already has a Worker' });
      }
      const worker = new Worker({
        userId: user._id,
        name,
        bio,
        skills,
        cv: req.file.filename,
      });
  
      const savedWorker = await worker.save({ timeout: 30000 });
      res.status(201).json({
        message: 'Worker created successfully',
        worker: savedWorker,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Failed to create worker',
        error,
      });
    }
  };

const getWorkerById = async (req, res, next) => {
    try {
      const workerId = req.params.id;
      const worker = await Worker.findById(workerId);
  
      if (!worker) {
        return res.status(404).json({
          message: 'Worker not found'
        });
      }
  
      res.status(200).json({
        message: 'Worker found',
        worker: worker
      });
    } catch (error) {
      res.status(500).json({
        message: 'Failed to get worker',
        error: error
      });
    }
  };
module.exports = {
  createWorker,
  getWorkerById
};
