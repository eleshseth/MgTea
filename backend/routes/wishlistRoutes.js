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
    // Populate foodId so frontend gets full food details
    const wishlist = await wishlistModel
      .findOne({ user: req.user._id })
      .populate('items.foodId');
    res.json({ success: true, wishlist: wishlist || { items: [] } });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: 'Could not fetch wishlist' });
  }
});
router.post('/add', authMiddleware, addToWishlist);
router.post('/remove', authMiddleware, removeFromWishlist);

export default router;
