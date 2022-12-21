const User = require("../models/user");
const fs = require("fs");
const path = require("path");

// render profile page
module.exports.profile = function (req, res) {
   User.findById(req.params.user_id, (err, user) => {
      return res.render("user_profile", {
         title: "profile",
         selected_user: user,
      });
   });
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
   User.findOne({ email: req.body.email }, (error, user) => {
      if (error) {
         req.flash("error", error);
         return res.redirect("back");
      }
      if (!user) {
         User.create(req.body, (err, user) => {
            if (err) {
               req.flash("error", err);
            }
            req.flash("success", "Account created successfully!");
            return res.redirect("/users/sign-in");
         });
      } else {
         req.flash(
            "error",
            "An account is already created with this email."
         );
         return res.redirect("back");
      }
   });
};

module.exports.update = async function (req, res) {
   // if (req.params.user_id == req.user.id) {
   //    User.findByIdAndUpdate(req.params.user_id, req.body, (err, user) => {
   //       req.flash("success", "Details updated successfully!");
   //       return res.redirect("/");
   //    });
   // } else {
   //    return res.status(401).send("Unauthorized");
   // }
   if (req.params.user_id == req.user.id) {
      try {
         let user = await User.findById(req.params.user_id);
         User.uploadedAvatar(req, res, function (err) {
            if (err) {
               console.log("*****Multer Error", err);
            }
            user.name = req.body.name;
            user.email = req.body.email;
            if (req.file) {
               const imagePath = path.join(__dirname, "..", user.avatar);
               if (user.avatar && fs.existsSync(imagePath)) {
                  fs.unlinkSync(imagePath);
               }
               //this is saving the avatar path in the avatar field of the user-schema
               user.avatar = User.avatarPath + "/" + req.file.filename;
            }
            user.save();
            return res.redirect("back");
         });
      } catch (error) {
         console.log("Error", err);
      }
   } else {
      return res.status(401).send("Unauthorized");
   }
};

// create session(Sign in) for user
module.exports.createSession = function (req, res) {
   req.flash("success", "Logged in successfully!");
   return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
   // req is provided logout function by passport
   req.logout(function (err) {
      if (err) {
         return console.log(error);
      }
      req.flash("success", "Logged out successfully!");
      res.redirect("/");
   });
};
