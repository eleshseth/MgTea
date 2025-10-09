import wishlistModel from '../models/wishlistModel.js';

// Get user's wishlist
export const getWishlist = async (req, res) => {
  try {
    const userId = req.user._id;

    const wishlistItems = await wishlistModel
      .find({ userId })
      .populate('foodId')
      .sort({ createdAt: -1 });

    const wishlist = wishlistItems
      .map((item) => item.foodId)
      .filter((food) => food !== null);

    res.json({ success: true, data: wishlist });
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    res.json({ success: false, message: 'Error fetching wishlist' });
  }
};

// Add item to wishlist
export const addToWishlist = async (req, res) => {
  try {
    const { foodId } = req.body;
    const userId = req.user._id;

    // Check if item already exists in wishlist
    const existingItem = await wishlistModel.findOne({ userId, foodId });
    if (existingItem) {
      return res.json({ success: false, message: 'Item already in wishlist' });
    }

    const wishlistItem = new wishlistModel({ userId, foodId });
    await wishlistItem.save();

    res.json({ success: true, message: 'Added to wishlist' });
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    res.json({ success: false, message: 'Error adding to wishlist' });
  }
};

// Remove item from wishlist
export const removeFromWishlist = async (req, res) => {
  try {
    const { foodId } = req.body;
    const userId = req.user._id;

    await wishlistModel.findOneAndDelete({ userId, foodId });
    res.json({ success: true, message: 'Removed from wishlist' });
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    res.json({ success: false, message: 'Error removing from wishlist' });
  }
};
