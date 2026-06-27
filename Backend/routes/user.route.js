const express = require("express")
const {getProfile,getUserById,updateProfile,searchUser,followUser,unfollowUser} = require("../controllers/user.controller");
const {protect} = require("../middleware/auth.middleware")
const upload  = require("../middleware/multer")
const router = express.Router();

router.get("/profile",protect,getProfile)

router.get("/search",protect,searchUser);

router.get("/:id",protect,getUserById)

router.put("/profile",protect,upload.single("profilepic"),updateProfile);

router.put("/follow/:id",protect,followUser);

router.put("/unfollow/:id",protect,unfollowUser);

module.exports = router;