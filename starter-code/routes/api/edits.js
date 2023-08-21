const express = require("express");
const router = express.Router();
const editsCtrl = require("../../controllers/api/edit");

router.post("/", editsCtrl.update);

module.exports = router;
