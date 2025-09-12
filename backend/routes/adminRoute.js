import express from 'express';
import { loginAdmin } from '../controllers/adminController.js';

const adminRouter = express.Router();

adminRouter.post('/login', loginAdmin);

adminRouter.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const adminModel = (await import('../models/adminModel.js')).default;
    const exist = await adminModel.findOne({ email });
    if (exist)
      return res.json({ success: false, message: 'Admin already exists' });
    const admin = await adminModel.create({ email, password });
    res.json({ success: true, admin });
  } catch (err) {
    res.json({ success: false, message: 'Error creating admin' });
  }
});

export default adminRouter;
