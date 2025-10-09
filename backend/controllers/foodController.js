import cloudinary from '../config/cloudinary.js';
import foodModel from '../models/foodModel.js';

const addFood = async (req, res) => {
  try {
    // Check if files are uploaded
    if (!req.files || req.files.length === 0) {
      return res.json({ success: false, message: 'No images uploaded' });
    }

    // Validate required fields
    const { name, description, price, category, discount } = req.body;
    if (!name || !description || !price || !category) {
      return res.json({
        success: false,
        message: 'All required fields must be provided',
      });
    }

    console.log('Files received:', req.files.length);
    console.log('Request body:', req.body);

    const imageResults = await Promise.all(
      req.files.map(async (file) => {
        console.log('Uploading file:', file.path);
        return await cloudinary.uploader.upload(file.path, {
          folder: 'first-time-use',
          transformation: [
            { width: 500, height: 500, crop: 'fill' },
            { quality: 'auto' },
            { fetch_format: 'auto' },
          ],
          resource_type: 'auto',
        });
      })
    );

    console.log('Cloudinary upload results:', imageResults.length);

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: Number(req.body.price),
      category: req.body.category,
      images: imageResults.map((result) => result.secure_url),
      cloudinary_id: imageResults.map((result) => result.public_id), // Fixed field name
      stock: Number(req.body.stock) || 0,
      discount: Number(req.body.discount) || 0, // Add discount field
    });

    const savedFood = await food.save();
    console.log('Food saved successfully:', savedFood._id);

    res.json({
      success: true,
      message: 'Food added',
      data: savedFood,
    });
  } catch (error) {
    console.error('Error in addFood:', error);
    res.json({
      success: false,
      message: 'Error: ' + error.message,
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
};

const updateFood = async (req, res) => {
  try {
    const { id, name, price, category, description, stock, discount } =
      req.body; // Add discount

    const updatedFood = await foodModel.findByIdAndUpdate(
      id,
      { name, price, category, description, stock, discount }, // Add discount to update
      { new: true }
    );

    if (!updatedFood) {
      return res.json({ success: false, message: 'Food item not found' });
    }

    res.json({
      success: true,
      message: 'Food item updated successfully',
      data: updatedFood,
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error updating food item' });
  }
};

const listFood = async (req, res) => {
  try {
    const food = await foodModel.find({});
    res.json({ success: true, data: food });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'error' });
  }
};

const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);

    if (!food) {
      return res.json({ success: false, message: 'Food item not found' });
    }

    // Delete images from Cloudinary
    if (food.cloudinary_id && food.cloudinary_id.length > 0) {
      await Promise.all(
        food.cloudinary_id.map((id) => cloudinary.uploader.destroy(id))
      );
    }

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: 'food removed' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error: ' + error.message });
  }
};

export { addFood, listFood, removeFood, updateFood };
