import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userName: { required: true, type: String, unique: true },
    email: { required: true, type: String, unique: true },
    password: { type: String, required: true },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    profilePic:{
        type:String,
        default: 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid'}
});

const User = mongoose.model('User', userSchema);
export default User;
