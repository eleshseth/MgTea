import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  items: [
    {
      foodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'food',
        required: true,
      },
      addedAt: { type: Date, default: Date.now },
    },
  ],
});

export default mongoose.model('wishlist', wishlistSchema);
