import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import multer from 'multer';
import auth from "../middlewares/auth.js";


const userRouter = express.Router();

const storage = multer.diskStorage({
    destination:(req, file,cb) =>
    {
        const uploadPath = path.resolve('uploads');
        cb(null,uploadPath);
    },
    filename: (req,file,cb)=>
    {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({storage: storage});

userRouter.post("/upload", auth, upload.single('file'), async (req, res) => {
    console.log("Auth middleware passed, user:", req.user);
    console.log("File upload request:", req.file);

    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        user.profilePic = `http://localhost:8000/uploads/${req.file.filename}`;
        await user.save();

        res.status(200).json({ message: 'Profile picture uploaded successfully', profilePic: user.profilePic });
    } catch (error) {
        console.error("Upload error:", error.message);
        res.status(400).json({ message: error.message });
    }
});
//Get All Users
userRouter.get("/",auth,async(req,res)=>{
    try {
        const users = await User.find({});

        if(!users || users.length == 0)
        {
          return  res.status(400).json({message:"Users Not Found"});

           
        }
        res.send(users);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})
//Get User ById
userRouter.get("/user/:id",auth,async (req,res)=>
{
    try 
    {
        const user = await User.findOne({_id:req.params.id});

        if(!user)
        {
          return  res.status(400).json({message:"User Not Found"});   
        }

        res.status(200).json(user);
        
    } catch (error) {
        console.error("Error fetching user:", error.message);
        res.status(400).json({ message: error.message });
    }
})

//Follow a User

userRouter.put("/follow/:id",auth,async (req,res)=>
{
    try 
    {
        const userToFollow = await User.findById(req.params.id);
        const user = await User.findById(req.user);

        if(!userToFollow || !user)
        {
            return res.status(400).json({message:"User Not Found"});
        }

        if(user.following.includes(userToFollow._id))
        {
            return res.status(400).json({ message: 'Already following this user' });
        }

        user.following.push(userToFollow._id);
        userToFollow.followers.push(user._id);

        await user.save();
        await userToFollow.save();
        res.status(200).json({ message: "User followed successfully" });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
})

// Unfollow a User
userRouter.put("/unfollow/:id",auth,async (req,res)=>
{
    try {
        const userToUnfollow = await User.findById(req.params.id);
        const user = await User.findById(req.user);

        if(!user.following.includes(userToUnfollow._id))
        {
            return res.status(400).json({message:"You are not following this user"});
        }

        user.following  = user.following.filter((following)=>{
           return following.toString() != userToUnfollow._id.toString();
        })

        userToUnfollow.followers = userToUnfollow.followers.filter(followerId => followerId.toString() !== user._id.toString());

        await user.save();
        await userToUnfollow.save();

        res.status(200).json({ message: "User unfollowed successfully" });
         
        
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }

})
// Get user's followers
userRouter.get("/followers",auth,async (req,res)=>
{
    try {
        const user = await User.findById(req.user).populate('followers','userName email profilePic');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user.followers);
        
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
})

//Get user's following
userRouter.get("/following",auth,async (req,res)=>
{   
    try 
    {
        const user = await User.findById(req.user).populate('following','userName email profilePic');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user.following);

        
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }

})











export default userRouter;