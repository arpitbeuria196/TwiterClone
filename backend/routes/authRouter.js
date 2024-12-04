import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const router = express.Router();

// Define your authentication routes
router.post('/register', async (req, res) => {
    const { userName, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already registered' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({
            userName,
            email,
            password: hashedPassword
        });

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, "socialMedia@123", { expiresIn: '1d' });

        // Set the token as an HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: 'Strict',
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        // Save the user in the database
        await user.save();

        const userResponse = await User.findById(user._id).select('-password');
        // Respond with success
        res.status(201).json({ 
          message: 'User registered successfully', 
          user:userResponse
      });
      

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if the user exists
      const user = await User.findOne({ email: email });
  
      if (!user) {
        return res.status(400).json({ message: 'User does not exist' });
      }
  
      // Check if the password matches
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Create JWT token
      const token = jwt.sign({ userId: user._id }, "socialMedia@123", { expiresIn: '1d' });
  
      // Set the cookie with the token
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });

      const userResponse = await User.findById(user._id).select('-password');
  
      // Send response with user data and success message
      res.status(200).json({
        message: "Logged In Successfully",
        user:userResponse
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message || "Internal Server Error" });
    }
  });
  

router.post("/logout",async (req,res)=>
{
    res.clearCookie('token',{
        httpOnly:true,
        secure:process.env.NODE_ENV === 'production',
        sameSite:'Strict',
    });
    res.status(200).json({message:"Logged out successfully"})
})


export default router;
