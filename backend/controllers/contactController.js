import contactModel from '../models/contactModel.js';

export const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const contact = await contactModel.create({
      name,
      email,
      subject,
      message
    });
    res.json({ success: true, message: 'Message sent successfully', contact });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.json({ success: false, message: 'Failed to send message' });
  }
};