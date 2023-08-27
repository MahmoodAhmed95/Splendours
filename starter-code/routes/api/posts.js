const express = require("express");
const router = express.Router();
const postsCtrl = require("../../controllers/api/posts");
// const upload = require("../../utils/multer");

router.post("/", postsCtrl.addPost);
router.get("/", postsCtrl.showPost);

router.delete("/delete/:id", postsCtrl.deletePost);

module.exports = router;
