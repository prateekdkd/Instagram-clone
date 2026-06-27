const Comment = require("../models/comment.model")
const Post = require("../models/post.model")
const createComment = async (req,res)=>{
    
    try{
        const post = await Post.findById(req.params.postId)

        if(!post)
        {
            return res.status(404).json({message:"Post not found"})
        }
        const comment = await Comment.create({
        text:req.body.text,
        user:req.user._id,
        post:req.params.postId
    })
    post.comments.push(comment._id);

    await post.save();
    res.status(200).json(comment);
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}


const getComment = async(req,res)=>{
    try{
    const comment = await Comment.find({
        post:req.params.postId
    })
    .populate("user","username profilePic")
    .sort({createdAt:-1})

    res.status(200).json(comment);
   }
   catch(err)
   {
    res.status(500).json({message:err.message})
   }
}

const deleteComment = async (req,res)=>{
    try{
      const comment = await Comment.findById(req.params.id);

      if(!comment)
      {
        return res,status(404).json({message:"Comment not found"})
      }

      if(comment.user.toString() !== req.user._id.toString())
      {
        return res.status(401).json({message:"Not authorized"})
      }
      await comment.deleteOne();

      res.status(200).json({message:"Comment deleted"})
    }
    catch(err)
    {
       res.status(500).json({message:err.message})
    }
}

module.exports = {createComment,getComment,deleteComment}