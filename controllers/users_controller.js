const UserDb = require("../models/user");

// render profile page
module.exports.profile = function (req, res) {
   if (req.cookies.user_id) {
      UserDb.findById(req.cookies.user_id, (err, user) => {
         if (err) {
            console.log("Error in finding if user exist or not");
         }
         if (user) {
            return res.render("user_profile", {
               title: "profile",
               user,
            });
         } else {
            return res.redirect("/users/sign-in");
         }
      });
   } else {
      return res.redirect("/users/sign-in");
   }

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
         console.log("Error in finding user in sign-up");
      }
      if (!user) {
         UserDb.create(req.body, (err, user) => {
            if (err) {
               console.log("Error in creating user in sign-up");
            }
            res.redirect("/users/sign-in");
         });
      } else {
         res.redirect("back");
      }
   });
};

// create session for user
module.exports.createSession = function (req, res) {
   //find User
   UserDb.findOne({ email: req.body.email }, (error, user) => {
      if (error) {
         console.log("Error in finding user in sign-in");
      }
      //user found
      if (user) {
         //password matched
         if (user.password === req.body.password) {
            //save cookie
            res.cookie("user_id", user.id);
            //redirect to profile page
            res.redirect("/users/profile");
         } else {
            //password not matched
            res.redirect("back");
         }
      } else {
         //user not found
         res.redirect("back");
      }
   });
};

//sign-out route
module.exports.signOut = function (req, res) {
   res.clearCookie("user_id");
   res.redirect("/users/sign-in");
};
