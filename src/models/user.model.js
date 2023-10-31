import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    username: { type:String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true}
}, {
    timestamps:true
});

const User = mongoose.model('User', userSchema); // create a Schema with name User, like an object

export default User;