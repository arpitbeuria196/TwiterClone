import Post from '../models/Posts.js';
import express from 'express';
import auth from '../middlewares/auth.js';

const postRouter = express.Router();

postRouter.post("/", auth, async (req, res) => {
    try {
      const { text, media } = req.body;
      const userId = req.user; 
  
      // Debugging logs
      console.log("Request body:", req.body);
      console.log("User ID:", userId);
  
      if (!userId) {
        return res.status(400).json({ message: "User ID is missing" });
      }
  
      if (!text && !media) {
        return res.status(400).json({ message: "Text or media is required" });
      }
  
      const post = await Post.create({
        user: userId,
        text,
        media,
      });
  
      res.status(201).json(post); 
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

//Get All Posts
postRouter.get("/",auth,async (req,res)=>
{
    try 
    {
        const posts = await Post.find().populate('user').sort({createdAt:-1});
        res.status(200).json(posts);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})
//Get SinglePost
postRouter.get("/:id",auth,async (req,res)=>
{
    try 
    {
        const post = await Post.findById(req.params.id).populate('user');
        if(!post)
        {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//Update Post
postRouter.put("/:id",auth, async (req,res)=>
{
    const {text,media} = req.body;
    try {
       
        const existingPost = await Post.findById(req.params.id);
        console.log(existingPost);
         if(!existingPost)
        {
            return res.status(404).json({ message: 'Post not found' });
        }
        existingPost.text = text || existingPost.text;
        existingPost.media = media || existingPost.media;

    const updatedPost =  await existingPost.save();
     res.status(200).json(updatedPost);

    } catch (error) 
    {
        res.status(500).json({ message: error.message });
        
    }
})

//Delete Post

postRouter.delete("/:id", auth, async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id); 
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



//Like/Unlike Post
postRouter.put("/:id/like", auth, async (req, res) => {
    try {
        const { userId } = req.body; // Extract userId from the request body

        // Validate userId
        if (!userId) return res.status(400).json({ message: 'User ID is required' });

        const post = await Post.findById(req.params.id);

        if (!post) return res.status(404).json({ message: 'Post not found' });

        // Check if the user has already liked the post
        if (post.likes.includes(userId)) {
            post.likes = post.likes.filter((like) => like.toString() !== userId); // Remove the user's like
            await post.save();
            return res.status(200).json({ message: 'Post unliked', likes: post.likes });
        }

        // Add the user's like
        post.likes.push(userId);
        await post.save();
        res.status(200).json({ message: 'Post liked', likes: post.likes });

    } catch (error) {
        res.status(500).json({ message: error.message || 'Internal Server Error' });
    }
});


//Add Comment
// Add Comment
postRouter.post("/:id/comment", auth, async (req, res) => {
    const { text } = req.body;
    try {
      // Find the post by its ID
      const post = await Post.findById(req.params.id);
      if (!post) return res.status(404).json({ message: 'Post not found' });
  
      // Add the comment with the user information
      const newComment = { user: req.user, text }; // Create the new comment object
      post.comments.push(newComment); // Push the new comment to the comments array
  
      // Save the post with the new comment
      await post.save();
  
      // Respond with the new comment
      res.status(200).json({
        message: "Comment Added Successfully",
        comment: newComment, // Return the newly added comment
      });
    } catch (error) {
      // If there's an error, return the error message
      res.status(500).json({ message: error.message });
    }
  });
  

export default postRouter;
