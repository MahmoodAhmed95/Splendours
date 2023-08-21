const express = require("express");
const router = express.Router();
const savingsCtrl = require("../../controllers/api/savings");
// const upload = require("../../utils/multer");

router.post("/", savingsCtrl.addBookmark);

module.exports = router;
