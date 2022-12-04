const UserDb = require("../models/user");

// render profile page
module.exports.profile = function (req, res) {
   return res.render("user_profile", { title: "profile" });
   //    res.send("<h1>Users Profile</h1>");
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
         console.log("Error in finding user in sign-up");
      }
      if (!user) {
         UserDb.create(req.body, (err, user) => {
            if (err) {
               console.log("Error in creating user in sign-up");
            }
            return res.redirect("/users/sign-in");
         });
      } else {
         return res.redirect("back");
      }
   });
};

// create session(Sign in) for user
module.exports.createSession = function (req, res) {
   return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
   // req is provided logout function by passport
   req.logout(function (err) {
      if (err) {
         return console.log(error);
      }
      res.redirect("/");
   });
};
