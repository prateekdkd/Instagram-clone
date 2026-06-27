const User = require("../models/user.model")
const jwt = require("jsonwebtoken");

const signup = async (req,res)=>{

    const {username,email,password} = req.body;
   try{
    if(!username || !email || !password)
    {
       return res.status(400).json({message:"Please fill the require fields"})
    }

    const userExist = await User.findOne({email})

    if(userExist)
    {
       return res.status(400).json({message:"User already exist"})
    }

    const user = await User.create({username,email,password})

    const token = generateToken(user._id);

    res.status(201).json({
        _id:user._id,
        username:user.username,
        email:user.email,
        token,
    })
   }
   catch(err){
      res.status(500).json({message:"Server error"})
      console.log(err);
   }
}



const login = async (req,res)=>{

    const {email,password} = req.body;
   try{
    if(!email || !password)
    {
       return res.status(400).json({message:"Please fill the require fields"})
    }


    const user = await User.findOne({email})

    if(!user || !(await user.matchPassword(password)))
    {
       return res.status(401).json({message:"Invalid password"})
    }
    const token = generateToken(user._id)
    res.status(201).json({
        user:{
        _id:user._id,
        username:user.username,
        email:user.email,
       },
        token,
    })
   }
   catch(err){
      res.status(500).json({message:err.message})
      console.log("Login Error",err);
   }
}
const generateToken = (id)=>{
     return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'30d'})
}

module.exports = {signup,login,generateToken}