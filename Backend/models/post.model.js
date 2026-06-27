const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    content:{
        type:String,
        require:true,
        trim:true
    },
    image:{
        type:String,
        default:""
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        require:true
    },
    likes:[{
         type:mongoose.Schema.Types.ObjectId,
         ref:"user"
    }
   ],
   comments: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "comment"
  }
]
},{timestamps:true});

const post = mongoose.model("post", postSchema)

module.exports = post;