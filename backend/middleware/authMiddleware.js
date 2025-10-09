import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

const authMiddleware = async (req, res, next) => {
  try {
    // Get the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res
        .status(401)
        .json({ success: false, message: 'Authentication required' });
    }
    const token = authHeader.split(' ')[1];
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Find user by id
    const user = await userModel.findById(decoded.id).select('-password');
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: 'User not found' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ success: false, message: 'Authentication required' });
  }
};

export default authMiddleware;
