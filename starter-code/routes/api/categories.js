const express = require("express");
const router = express.Router();
const categoriesCtrl = require("../../controllers/api/categories");

router.post("/", categoriesCtrl.addCategory);

module.exports = router;
