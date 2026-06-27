const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    text:{
        type:String,
        require:true,
        trim:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        require:true
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"post",
        require:true
    }
},{timestamps:true});

const comment = mongoose.model("comment", commentSchema);

module.exports = comment;