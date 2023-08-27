const express = require("express");
const router = express.Router();
const editsCtrl = require("../../controllers/api/edit");

router.put("/", editsCtrl.updateProfile);

module.exports = router;
