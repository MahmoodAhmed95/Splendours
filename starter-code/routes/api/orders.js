const express = require("express");
const router = express.Router();
const ordersCtrl = require("../../controllers/api/orders");

// POST /api/orders/bookmarks/items/:id
router.post("/bookmarks/items/:id", ordersCtrl.addToBookMark);

router.get("/bookmarks/items", ordersCtrl.getBookMarks);

router.delete("/bookmarks/:id", ordersCtrl.deleteBookMark);
module.exports = router;
