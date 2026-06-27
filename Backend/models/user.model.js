const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true
    },
      email:{
        type:String,
        require:true,
        unique:true
    },
      password:{
        type:String,
        require:true
    },
    bio:{
        type:String,
        default:""
    },
    profilePic:{
       type:String,
       default:""
    },
    followers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        }

    ],
    following:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        }

    ]
},{timestamps:true})
userSchema.pre("save", async function() {
    
    if(!this.isModified("password"))
    {
        return;
    }
    const salt =  await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password)   
}

const user = mongoose.model("user",userSchema);

module.exports = user