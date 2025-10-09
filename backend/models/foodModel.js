import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String, required: true }], // Array of image URLs
    cloudinary_id: [{ type: String, required: true }], // Array of Cloudinary IDs
    category: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 }, // Added stock field
    discount: { type: Number, default: 0, min: 0, max: 100 }, // Discount percentage
  },
  { timestamps: true }
);

const foodModel = mongoose.models.food || mongoose.model('food', foodSchema);
export default foodModel;
