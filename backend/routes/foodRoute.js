import express from 'express';
import {
  addFood,
  listFood,
  removeFood,
  updateFood,
} from '../controllers/foodController.js';
import multer from 'multer';

const foodRouter = express.Router();

//image storage engine
const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

// Add file filter to allow PNG and other image formats
const fileFilter = (req, file, cb) => {
  // Allow PNG, JPG, JPEG, WEBP, GIF files
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/webp' ||
    file.mimetype === 'image/gif'
  ) {
    cb(null, true);
  } else {
    cb(
      new Error('Only PNG, JPG, JPEG, WEBP, and GIF files are allowed'),
      false
    );
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB file size limit
    fieldSize: 25 * 1024 * 1024, // 25MB field size limit
  },
});

// Error handling middleware for multer
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File size too large. Maximum size allowed is 10MB per file.',
      });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: 'Too many files. Maximum 10 images allowed.',
      });
    }
    if (err.code === 'LIMIT_FIELD_VALUE') {
      return res.status(400).json({
        success: false,
        message: 'Field value too large.',
      });
    }
    return res.status(400).json({
      success: false,
      message: `Upload error: ${err.message}`,
    });
  }
  next(err);
};

foodRouter.post('/add', upload.array('images', 10), handleMulterError, addFood); // Increased to handle up to 10 images
foodRouter.get('/list', listFood);
foodRouter.post('/remove', removeFood);
foodRouter.post('/update', updateFood);

export default foodRouter;
