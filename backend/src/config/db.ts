import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI || '')
      .then(() => console.log('connected to db'));
  } catch (error) {
    console.error('mongoose ERROR', error);
    process.exit(1);
  }
};

export default connectDb;
