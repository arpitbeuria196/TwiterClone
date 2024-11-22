import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userName: { required: true, type: String, unique: true },
    email: { required: true, type: String, unique: true },
    password: { type: String, required: true },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const User = mongoose.model('User', userSchema);
export default User;
