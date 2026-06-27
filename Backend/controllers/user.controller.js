const User = require("../models/user.model")
const fs = require("fs")
const imagekit = require("../config/imagekit")
const getProfile = async (req,res)=>{
    try{
        const user = await User.findById(req.user._id)
        .select("-password")

        res.status(200).json(user);
    }
    catch (err){
        res.status(500).json({message:err.message})
    }
};

const getUserById = async (req,res)=>{
    try{
       const user = await User.findById(req .params.id)
       .select("-password");

       if(!user)
       {
        res.status(404).json({message:"User not found"})
       }

       res.status(200).json(user)
    }
    catch(err){
         res.status(500).json({message:err.message})
    }
}

const updateProfile = async (req,res)=>{
    try{
       const user = await User.findById(req.user._id)
       .select("-password")

      if(!user)
       {
       return  res.status(404).json({message:"User not found"})
       }

       user.username = req.body.username || user.username;
       user.bio = req.body.bio || user.bio;
      if (req.file) {
      const uploaded = await imagekit.upload({
        file: fs.readFileSync(req.file.path),
        fileName: req.file.filename,
      });

      user.profilePic = uploaded.url;

      fs.unlinkSync(req.file.path);
    }

       const updatedUser = await user.save();

       res.status(200).json(updatedUser)

    }
    catch(err){
       res.status(500).json({message:err.message})
    }
}

const searchUser = async (req,res)=>{
   
    try{
        const keyword = req.query.keyword
        ?{
            username:{
                $regex:req.query.keyword,
                $options:"i"
            }
        }
        :{};

        const users = await User.find(keyword)
        .select("-password")

        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json({message:err.message});
    }

}

const followUser = async (req,res)=>{
    try{
         
        const currentUser = await User.findById(req.user._id)
        const targetUser =  await User.findById(req.params.id)

        if(!targetUser)
        {
            return res.status(404).json({message:"User not found"})
        }

        if(req.user._id.toString() === req.params.id)
        {
            return res.status(400).json({message:"You cannot follow yourself"})
        }

        if(targetUser.followers.includes(req.user._id))
        {
            return res.status(400).json({message:"Already following"})
        }

        targetUser.followers.push(req.user._id)
        currentUser.following.push(targetUser._id)


        await targetUser.save();
        await currentUser.save();

        res.status(200).json({message:"User followed succesfully"})
    }
    catch(err)
    {
       res.status(500).json({message:err.message})
    }
}

const unfollowUser = async (req,res)=>{
    try {

        const currentUser = await User.findById(req.user._id);
        const targetUser = await User.findById(req.params.id);

        if(!targetUser){
            return res.status(404).json({
                message:"User not found"
            });
        }

        targetUser.followers.pull(req.user._id);
        currentUser.following.pull(targetUser._id);

        await targetUser.save();
        await currentUser.save();

        res.status(200).json({
            message:"User unfollowed successfully"
        });

    } catch (error) {
        res.status(500).json({
            message:error.message
        });
    }
};

module.exports = {getProfile,getUserById,updateProfile,searchUser,followUser,unfollowUser}