import mongoose from 'mongoose';

const connectToMongoDB = async (): Promise<void> => {
    mongoose.connect(process.env.MONGO_URI);
}

export { connectToMongoDB }