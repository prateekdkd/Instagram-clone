const Post = require("../models/post.model")
const User = require("../models/user.model")
const imagekit = require("../config/imagekit")
const fs = require("fs")
const { create } = require("../models/user.model")

const createPost = async (req,res)=>{

    try{
        let imageUrl = "";

        if(req.file)
        {
            const uploaded = await imagekit.upload({
                file : fs.readFileSync(req.file.path),
                fileName:req.file.filename
            })
            imageUrl = uploaded.url;

            fs.unlinkSync(req.file.path)
        }
        const post = await Post.create({
            content:req.body.content,
            image:imageUrl,
            user:req.user._id,
        })
        res.status(201).json(post)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

const getAllPosts = async (req,res)=>{
   try{ 
    const post = await Post.find()
    .populate("user,username,profilePic")
    .sort({createdAt:-1});

    res.status(200).json(post);
    }
    catch(err)
    {
        res.status(500).json({message:err.message})
    }
}

const getSinglePost = async (req,res)=>{
   try{
    const post = await  Post.findById(req.params.id)
    .populate("user,username,profilePic")

    if(!post)
    {
        return res.status(404).json({message:"Post not found"})
    }

    res.status(200).json(post);
   }
   catch(err){
     res.status(500).json({message:err.message})
   }
}

const deletePost = async (req,res)=>{
    try{
        const post = await  Post.findById(req.params.id);

        if(!post)
        {
            return res.status(404).json({message:"Post not found"})
        }

        if(post.user.toString() !== req.user._id.toString())
        {
            return res.status(401).json({message:"Not authorized"})
        }

        await post.deleteOne();

        res.status(200).json({message:"Post Deleted"})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

const likePost = async (req,res)=>{

    try{
        const post = await  Post.findById(req.params.id);
   
        if(!post)
        {
            return res.status(404).json({message:"Post not found"})
        }

        if(post.likes.includes(req.user._id))
        {
            return res.status(400).json({message:"Already liked"})
        }

        post.likes.push(req.user._id);

        await post.save();

        res.status(200).json({message:"Post liked"})
    }
     catch(err)
     {
        res.status(500).json({message:err.message})
     }
}

const unlikePost = async (req,res)=>{
    try{
       const post = await Post.findById(req.params.id);

       if(!post)
        {
            return res.status(404).json({message:"Post not found"})
        }
        post.likes.pull(req.user._id);

        await post.save();

        res.status(200).json({message:"Post unliked"})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
    }

    const getFeedPost = async (req,res)=>{

        try{
            const currentUser = await  User.findById(req.user._id);
 
            const posts = await Post.find()
            .populate("user", "username profilePic")
            .populate({ path: "comments",
                    populate: {
                    path: "user",
                    select: "username profilePic"
                     }})
            .sort({createdAt:-1})

            res.status(200).json(posts)
        }
        catch (err){
            console.log(err);
             res.status(500).json({message:err.message})
        }
    }
    
    const getUserPost = async (req,res)=>{

        try{
 
            const posts = await Post.find({user:req.params.id})
            .populate("user", "username profilePic")
            .sort({createdAt:-1})

            res.status(200).json(posts)
        }
        catch (err){
            console.log(err);
             res.status(500).json({message:err.message})
        }
    }

module.exports = {createPost,getAllPosts,getSinglePost,deletePost,likePost,unlikePost,getFeedPost,getUserPost}