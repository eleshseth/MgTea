import express from 'express';
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from '../controllers/wishlistController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import wishlistModel from '../models/wishlistModel.js';

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    // Find all wishlist items for the user and populate food details
    const wishlistItems = await wishlistModel
      .find({ userId: req.user._id })
      .populate('foodId')
      .sort({ createdAt: -1 });

    // Extract the food items from wishlist
    const wishlist = wishlistItems
      .map((item) => item.foodId)
      .filter((food) => food !== null);

    res.json({ success: true, data: wishlist });
  } catch (err) {
    console.error('Error fetching wishlist:', err);
    res
      .status(500)
      .json({ success: false, message: 'Could not fetch wishlist' });
  }
});
router.post('/add', authMiddleware, addToWishlist);
router.post('/remove', authMiddleware, removeFromWishlist);

export default router;
