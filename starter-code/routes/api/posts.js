const express = require("express");
const router = express.Router();
const postsCtrl = require("../../controllers/api/posts");
// const upload = require("../../utils/multer");

router.post("/", postsCtrl.addPost);

module.exports = router;
