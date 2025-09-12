import mongoose from 'mongoose';

export const connectDB = async () => {
  await mongoose
    .connect(
      'mongodb+srv://eleshseth:7py3fqa3b3Vfix1s@cluster0.xw2opf8.mongodb.net/MgTea'
    )
    .then(() => console.log('db connected'));
};
