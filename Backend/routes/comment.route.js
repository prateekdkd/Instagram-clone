const express = require("express")
const  {createComment,getComment,deleteComment} = require("../controllers/comment.controller")
const {protect} = require("../middleware/auth.middleware")
const router = express.Router();

router.post("/:postId",protect,createComment);

router.get("/:postId",protect, getComment);

router.delete("/:id",protect,deleteComment)

module.exports = router;