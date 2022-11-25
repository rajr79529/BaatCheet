const UserDb = require("../models/user");

// render profile page
module.exports.profile = function (req, res) {
   return res.render("user_profile", { title: "profile" });
   //    res.send("<h1>Users Profile</h1>");
};

// render posts page
module.exports.posts = function (req, res) {
   res.send("<h1>THis is Posts section</h1>");
};

// render sign-in page
module.exports.signIn = function (req, res) {
   return res.render("user_sign_in", { title: "sign_in" });
};

// render sign-up page
module.exports.signUp = function (req, res) {
   return res.render("user_sign_up", { title: "sign_up" });
};

// create user
module.exports.create = function (req, res) {
   if (req.body.password !== req.body.cnf_password) {
      res.redirect("back");
      return;
   }
   UserDb.findOne({ email: req.body.email }, (error, user) => {
      if (error) {
         console.log("Unable to connect to UserDb");
      }
      if (!user) {
         UserDb.create(req.body);
         res.redirect("/users/sign-in");
      } else {
         res.redirect("back");
      }
   });
};

// create session for user
module.exports.createSession = function (req, res) {
   //TODO
};
