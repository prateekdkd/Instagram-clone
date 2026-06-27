const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./config/db");
const authroute = require("./routes/auth.route")
const commentroute = require("./routes/comment.route")
const postroute = require("./routes/post.route")
const userroute = require("./routes/user.route")
const cors = require("cors")
dotenv.config();

connectDB();

const app = express();

app.use(cors())
app.use(express.json());


app.use("/uploads", express.static("uploads"));

app.use("/api/auth",authroute)
app.use("/api/users", userroute);
app.use("/api/posts",postroute);
app.use("/api/comments",commentroute);

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})

