const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = async ()=>{
   
    try{
          console.log(process.version);
    console.log(process.env.MONGO_URI);
         const conn =  await mongoose.connect(process.env.MONGO_URI)
         console.log("DB Connected")
            console.log("Connected:", conn.connection.host);
    }
    catch (err){
        console.log(err);
    }
}
module.exports  = connectDB;