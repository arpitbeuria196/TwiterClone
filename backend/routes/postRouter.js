import Post from '../models/Posts.js';
import express from 'express';
import auth from '../middlewares/auth.js';

const postRouter = express.Router();

postRouter.post("/", auth, async (req, res) => {
    try {
        const { text, media } = req.body;
        const userId = req.user; 

        if (!userId) {
            return res.status(400).json({ message: 'User ID is missing' });
        }

        const post = await Post.create({
            user: userId,  
            text,
            media
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

postRouter.delete("/:id",auth, async (req,res)=>
    {
        const {text,media} = req.body;
        try {
           
            const post = await Post.find(req.params.id);
             if(!post)
            {
                return res.status(404).json({ message: 'Post not found' });
            }
            
            await post.remove();
            res.status(200).json({ message: 'Post deleted successfully' });
    
        } catch (error) 
        {
            res.status(500).json({ message: error.message });
            
        }
    })

//Like/Unlike Post
postRouter.put("/:id/like",auth, async(req,res)=>
{
    try 
    {

        const post = await Post.findById(req.params.id);

        if (!post) return res.status(404).json({ message: 'Post not found' })

        if(post.likes.includes(req.user))
        {
            post.likes = post.likes.filter((like)=> like.toString()!=req.user);
            await post.save();
            return res.status(200).json({ message: 'Post unliked', likes: post.likes });
        }

        post.likes.push(req.user);
        await post.save();
        res.status(200).json({ message: 'Post liked', likes: post.likes });

    } catch (error) {
        res.status(500).json({ message: error.message });   
    }
})

//Add Comment
postRouter.post("/:id/comment",auth,async (req,res)=>
{
    const {text} = req.body;
    try 
    {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        
        post.comments.push({user: req.user,text});
        await post.save();
        res.status(200).json({message:"Comment Added Successfully"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

export default postRouter;
