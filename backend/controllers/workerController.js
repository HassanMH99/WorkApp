const multer = require('multer');
const Worker = require('../module/worker');
const User = require('../module/users');

const upload = multer({ dest: 'uploads/' }); // Multer configuration

// Create a new worker
const createWorker = async (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
      const userId = req.body.userId;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
  // Create a new worker object from the request body
   const worker = new Worker({
    userId: user._id,
    name: req.body.name,
    bio: req.body.bio,
    skills: req.body.skills,
    cv: req.file.filename // Store the filename of the uploaded CV
  });

  // Save the worker to the database
  await worker.save({ timeout: 30000 })
    .then(result => {
      res.status(201).json({
        message: 'Worker created successfully',
        worker: result
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Failed to create worker',
        error: error
      });
    });
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
