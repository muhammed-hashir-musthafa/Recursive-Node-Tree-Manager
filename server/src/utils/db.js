import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/nodetree');
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('DB connection failed', error);
    process.exit(1);
  }
};