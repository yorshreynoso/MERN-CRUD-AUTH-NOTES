import mongoose from "mongoose";
import 'dotenv/config';
import config from 'config';

const { URL } = config.get("Database");

 const connectDB = async () => {
    try {
        await mongoose.connect(`${ URL }`);
        console.info(`MongoDB Connected Correctly, mode:${process.env.NODE_ENV}`);
        
    } catch (error) {
        console.error(error);
    }
};

//export { connectDB }; or

export default connectDB;