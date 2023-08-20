const express = require("express");
const router = express.Router();
const detailsCtrl = require("../../controllers/api/details");

// GET /api/items/:id
router.get("/:id", detailsCtrl.showDetails);

module.exports = router;
