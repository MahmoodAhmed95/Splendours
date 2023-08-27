const express = require("express");
const router = express.Router();
const categoriesCtrl = require("../../controllers/api/categories");

router.post("/", categoriesCtrl.addCategory);
router.get("/", categoriesCtrl.showCategory);
router.delete("/delete/:id", categoriesCtrl.deleteCategory);

module.exports = router;
