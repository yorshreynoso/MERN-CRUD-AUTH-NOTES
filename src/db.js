import mongoose from "mongoose";

const url = 'mongodb+srv://yorshreynoso:qJERzR9EUVOsCOaX@clustertest.eq4leqk.mongodb.net/';

 const connectDB = async () => {
    try {
        await mongoose.connect(`${ url }`);
        console.info(`MongoDB Connected Correctly`);
        
    } catch (error) {
        console.error(error);
    }

};

//export { connectDB }; or

export default connectDB;