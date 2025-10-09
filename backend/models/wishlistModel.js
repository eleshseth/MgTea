import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    foodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'food',
      required: true,
    },
  },
  { timestamps: true }
);

// Compound index to prevent duplicate wishlist items
wishlistSchema.index({ userId: 1, foodId: 1 }, { unique: true });

const wishlistModel =
  mongoose.models.Wishlist || mongoose.model('Wishlist', wishlistSchema);
export default wishlistModel;
