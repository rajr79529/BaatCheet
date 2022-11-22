const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home_controller");

console.log("Index from Routes");
router.get("/", homeController.home);

//for any further routes use below syntax
router.use("/users", require("./users"));

module.exports = router;
