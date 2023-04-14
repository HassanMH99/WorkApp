const multer = require('multer');
const Worker = require('../module/worker');
const User = require('../module/users');

const upload = multer({ dest: 'uploads/' }); // Multer configuration




// Create a new worker
const docxConverter = require('docx-pdf');

const createWorker = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  const { name, bio, skills } = req.body;
  const userId = req.params.userId;
  const url = req.protocol + '://' + req.get('host')
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const existingworker = await Worker.findOne({ userId: user._id });
    if (existingworker) {
      return res.status(400).json({ message: 'User already has a Worker' });
    }

    // Convert the docx file to pdf format
    const pdfFileName = `${Date.now()}.pdf`;
    docxConverter(`${req.file.path}`, `${req.file.destination}/${pdfFileName}`, function (err, result) {
      if (err) {
        return res.status(500).json({ message: 'Error converting file to pdf' });
      }
      // Save the worker object with the pdf file path
      const worker = new Worker({
        userId: user._id,
        name,
        bio,
        skills,
        cv: `${url}/uploads/${pdfFileName}`,
      });
      worker.save();
      res.status(201).json({ message: 'Worker created successfully', worker });
    });
  } catch (error) {
    next(error);
  }
};


const getWorkerById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const worker = await Worker.findOne({ userId: userId }).populate('userId');

    if (!worker) {
      return res.status(404).json({
        message: 'Worker not found'
      });
    }
    res.setHeader('Content-Disposition', 'inline');
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
