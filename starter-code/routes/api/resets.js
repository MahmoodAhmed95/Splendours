const express = require("express");
const router = express.Router();
const resetsCtrl = require("../../controllers/api/reset");

router.put("/", resetsCtrl.resetPass);

module.exports = router;
