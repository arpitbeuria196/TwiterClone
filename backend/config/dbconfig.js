import mongoose from 'mongoose';

const connectDB = async ()=>
{
    try 
    {
        const conn = await mongoose.connect("MONGO_URI=mongodb+srv://Arpit196:yDB6s47VgJc30YEO@cluster0.uohce.mongodb.net/SocialMediaApp");
        console.log("MongoDB Connected");
        
    } catch (error) 
    {
        console.error(`MongoDB Connection Error: ${error.message}`);
        
    }
}

export default connectDB;