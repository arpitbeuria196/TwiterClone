import mongoose from 'mongoose';

const connectDB = async ()=>
{
    try 
    {
        mongoose.connect("mongodb+srv://arpit196:arpitbeuria@cluster0.uohce.mongodb.net/SocialMediaDB");
        console.log("MongoDB connected");
        
    } catch (error) 
    {
        console.error(`MongoDB Connection Error: ${error.message}`);
        
    }
}

export default connectDB;