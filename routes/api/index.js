const express = require("express");
const router = express.Router();

//dont forget use with get
router.use("/v1", require("./v1"));
router.use("/v2", require("./v2"));

module.exports = router;
