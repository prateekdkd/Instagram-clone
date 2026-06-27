const express = require("express")
const {createPost,getAllPosts,getSinglePost,deletePost,likePost,unlikePost,getFeedPost,getUserPost} = require("../controllers/post.controller")
const {protect} = require("../middleware/auth.middleware")
const upload = require("../middleware/multer")
const router = express.Router();

router.post("/",protect,upload.single("image"),createPost);

router.get("/",protect,getAllPosts);

router.get("/feed",protect,getFeedPost);

router.get("/user/:id", protect, getUserPost);

router.get("/:id",protect,getSinglePost);

router.delete("/:id",protect,deletePost);

router.put("/like/:id",protect,likePost)

router.put("/unlike/:id",protect,unlikePost);



module.exports = router;