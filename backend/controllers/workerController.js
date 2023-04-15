const multer = require('multer');
const Worker = require('../module/worker');
const User = require('../module/users');
const upload = multer({ dest: 'uploads/' }); // Multer configuration
const axios = require('axios');
const docxConverter = require('docx-pdf');
const fs = require('fs')
const pdfparse = require('pdf-parse')

// Create a new worker


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
    console.log(worker.cv);
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
  const getWorkerCVInfo = async (req, res, next) => {
    
    const { educationKeywords, experienceKeywords } = req.body;
    
    try {
      // Find the worker document with the given ID
      const count = await Worker.countDocuments();
      const randomIndex = Math.floor(Math.random() * count);
      const worker = await Worker.findOne().skip(randomIndex);
      if (!worker) {
        return res.status(404).json({ error: 'Worker not found' });
      }
    
      // Download the PDF file from the URL in the worker's cv field
      const pdfBuffer = await axios.get(`${worker.cv}`, { responseType: 'arraybuffer' });
      const pdfData = new Uint8Array(pdfBuffer.data);
    
      // Parse the PDF file using pdf-parse library
      const pdf = await pdfparse(pdfData);
      if (!pdf || !pdf.text) {
        return res.status(400).json({ error: 'PDF parsing error' });
      }
      const numPages = pdf.numpages;
      if (numPages < 1) {
        return res.status(400).json({ error: 'PDF document has no pages' });
      }
    
      // Extract text content from each page of the PDF file
      const textContent = pdf.text.split('\n');
    
      // Search for education and experience keywords in the extracted text
      // const defaultEducationKeywords = ['degree','average', 'bachelor', 'master', 'computer science', 'engineering','full stack'];
      // const defaultExperienceKeywords = ['experience', 'work', 'employment', 'job', 'project', 'skill'];
    
      const education = [];
      const experience = [];
    
      textContent.forEach(text => {
        const lowerCaseText = text.toLowerCase();
      
        // Search for education keywords
        if (educationKeywords.some(keyword => lowerCaseText.includes(keyword))) {
          education.push(text);
        }
      
        // Search for experience keywords
        if (experienceKeywords.some(keyword => lowerCaseText.includes(keyword))) {
          experience.push(text);
        }
      });
    
      const educationAndExperience = {
        education: education.join(','),
        experience: experience.join(',')
      };
    
      // Send the extracted education and experience data in the response
      res.status(200).json({ educationAndExperience });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return res.status(404).json({ error: 'CV not found' });
      }
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
    
    
  };
module.exports = {
  createWorker,
  getWorkerById,
  getWorkerCVInfo
};
