const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../frontend/public/uploads/'));
  },
  filename: function (req, file, cb) {
    cb(null,file.originalname)
  }
});

const fileFilter = (req, file, cb) => {
  // Only accept files with the following mime types
  const allowedTypes = /doc|docx|pdf|jpeg|png/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('File type not supported'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // 5MB file size limit
  },
  fileFilter: fileFilter
});

// Middleware function to handle file uploads
const handleUpload = (req, res, next) => {
  upload.single('cv')(req, res, function (error) {
    if (error) {
      return res.status(400).json({
        message: error.message,
    
      });
    }
    next();
  });
};

module.exports = handleUpload;
