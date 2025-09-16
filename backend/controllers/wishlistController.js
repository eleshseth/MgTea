import wishlistModel from '../models/wishlistModel.js';

// Get user's wishlist
export const getWishlist = async (req, res) => {
  try {
    const wishlist = await wishlistModel.findOne({ user: req.user._id });
    res.json({ success: true, wishlist: wishlist || { items: [] } });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: 'Could not fetch wishlist' });
  }
};

// Add item to wishlist
export const addToWishlist = async (req, res) => {
  const { foodId } = req.body;
  try {
    let wishlist = await wishlistModel.findOne({ user: req.user._id });
    if (!wishlist) {
      wishlist = new wishlistModel({ user: req.user._id, items: [] });
    }
    if (!wishlist.items.some((item) => item.foodId.toString() === foodId)) {
      wishlist.items.push({ foodId });
      await wishlist.save();
    }
    res.json({ success: true, wishlist });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: 'Could not add to wishlist' });
  }
};

// Remove item from wishlist
export const removeFromWishlist = async (req, res) => {
  const { foodId } = req.body;
  try {
    const wishlist = await wishlistModel.findOne({ user: req.user._id });
    if (wishlist) {
      wishlist.items = wishlist.items.filter(
        (item) => item.foodId.toString() !== foodId
      );
      await wishlist.save();
    }
    res.json({ success: true, wishlist });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: 'Could not remove from wishlist' });
  }
};
