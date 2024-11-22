import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        text: { type: String, required: true },
        media: { type: String }, // For images/videos
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of user IDs
        comments: [
            {
                user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
                text: { type: String, required: true },
                createdAt: { type: Date, default: Date.now },
            },
        ],
    },
    { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
);

const Post = mongoose.model('Post', PostSchema);
export default Post;
