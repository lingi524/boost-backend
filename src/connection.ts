import mongoose from 'mongoose';
require('dotenv').config()

const connectToMongoDB = async (): Promise<void> => {
    mongoose.connect(process.env.MONGO_URI);
}

export { connectToMongoDB }