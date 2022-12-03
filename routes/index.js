const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home_controller");

router.get("/", homeController.home);

//for any further routes use below syntax
router.use("/users", require("./users"));
router.use("/posts", require("./posts"));

module.exports = router;
