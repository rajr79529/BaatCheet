const Post = require("../models/post");

module.exports.create = (req, res) => {
   Post.create(
      {
         content: req.body.feed_post,
         user: req.user._id,
      },
      (error, post) => {
         if (error) {
            console.log("Error in creating Post");
            return;
         }
         res.redirect("back");
      }
   );
};
