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
    fileSize: 5 * 1024 * 1024, // 5MB file size limit
  },
});
foodRouter.post('/add', upload.array('images', 5), addFood); // Changed to handle multiple images
foodRouter.get('/list', listFood);
foodRouter.post('/remove', removeFood);
foodRouter.post('/update', updateFood);

export default foodRouter;
