const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users_controller");
const passport = require("passport");

router.get(
   "/profile/:user_id",
   passport.checkAuthentication,
   usersController.profile
);
router.get(
   // instead of creating a middleware,direct call req.isAuthenticated()
   "/sign-in",
   passport.checkActiveSession,
   usersController.signIn
);
router.get(
   "/sign-up",
   passport.checkActiveSession,
   usersController.signUp
);

router.post("/create", usersController.create);

//use passport as a middleware to authenticate
router.post(
   "/create-session",
   passport.authenticate("local", {
      failureRedirect: "/users/sign-in",
   }),
   usersController.createSession
);

router.get("/sign-out", usersController.destroySession);

router.post(
   "/update/:user_id",
   passport.checkAuthentication,
   usersController.update
);

module.exports = router;
