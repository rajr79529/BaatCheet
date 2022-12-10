const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = (req, res) => {
   Post.create(
      {
         content: req.body.feed_post,
         user: req.user._id,
      },
      (error, post) => {
         if (error) {
            req.flash("error", error);
            return res.redirect("back");
         }
         req.flash("success", "post created successfully!");
         res.redirect("back");
      }
   );
};

module.exports.destroy = (req, res) => {
   //first we will check if there is post
   //_id gives id but .id gives id in String format
   Post.findById(req.params.id, (err, post) => {
      if (post.user == req.user.id) {
         post.remove();
         Comment.deleteMany({ post: req.params.id }, (err) => {
            req.flash("success", "post deleted successfully!");
            return res.redirect("back");
         });
      } else {
         req.flash("error", "You can not delete this post!");
         return res.redirect("back");
      }
   });
};
