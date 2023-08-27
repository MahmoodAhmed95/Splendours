const express = require("express");
const router = express.Router();
const ordersCtrl = require("../../controllers/api/orders");

// POST /api/orders/bookmarks/items/:id
router.post("/bookmarks/items/:id", ordersCtrl.addToBookMark);

router.get("/bookmarks/items", ordersCtrl.getBookMarks);

router.get("/bids/items", ordersCtrl.getBids);

router.get("/auctions/items", ordersCtrl.getAuctions);

router.post("/bids/prevBidder/:id", ordersCtrl.setPrevBid);

router.post("/bids/items/:id", ordersCtrl.setNewBid);

router.delete("/bookmarks/:id", ordersCtrl.deleteBookMark);

router.delete("/auctions/:id", ordersCtrl.deleteAuction);

module.exports = router;
