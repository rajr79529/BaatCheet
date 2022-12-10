const Post = require("../models/post");
const User = require("../models/user");

module.exports.home = function (req, res) {
   // Post.find({}, (err, posts) => {
   //    if (err) {
   //       console.log("Error in finding posts", err);
   //       return;
   //    }
   //    return res.render("home", { title: "Home", posts });
   // });

   //populate will replace the objectId with the whole user object.
   Post.find()
      .populate("user")
      .populate({
         path: "comments",
         populate: {
            path: "user",
         },
      })
      .exec((err, posts) => {
         User.find({}, (err, users) => {
            if (err) {
               console.log("Error in finding posts", err);
               return;
            }
            return res.render("home", {
               title: "Home",
               posts,
               all_users: users,
            });
         });
      });
};
