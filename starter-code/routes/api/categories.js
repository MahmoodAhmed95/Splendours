const express = require("express");
const router = express.Router();
const categoriesCtrl = require("../../controllers/api/categories");

router.post("/", categoriesCtrl.addCategory);
router.get("/", categoriesCtrl.showCategory);

module.exports = router;
