import mongoose from 'mongoose';
import { MONGODB_URI } from './config';

export const initDatabase = async (): Promise<void> => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', (error as Error).message);
    }
}

export default mongoose;
