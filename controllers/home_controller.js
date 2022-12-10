const Post = require("../models/post");
const User = require("../models/user");

module.exports.home = async function (req, res) {
   //populate will replace the objectId with the whole user object.
   try {
      const posts = await Post.find()
         .populate("user")
         .populate({
            path: "comments",
            populate: {
               path: "user",
            },
         });
      const users = await User.find({});
      return res.render("home", {
         title: "Home",
         posts,
         all_users: users,
      });
   } catch (err) {
      console.log("Error", err);
   }
};
