const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = async function (req, res) {
   try {
      const post = await Post.findById(req.body.post);
      if (post) {
         const comment = await Comment.create({
            content: req.body.content,
            user: req.user._id,
            post: req.body.post,
         });
         //putting comment ref to post's comments
         post.comments.push(comment);
         //telling server to save
         post.save();
         req.flash("success", "Comment added successfully!");
         res.redirect("back");
      }
   } catch (err) {
      req.flash("error", err);
      res.redirect("back");
   }
};

module.exports.destroy = async (req, res) => {
   try {
      const comment = await Comment.findById(req.params.id);
      if (comment.user == req.user.id) {
         const postId = comment.post;
         comment.remove();
         await Post.findByIdAndUpdate(postId, {
            $pull: { comments: req.params.id },
         });
         req.flash("success", "Comment deleted successfully!");
         return res.redirect("back");
      } else {
         req.flash("error", "You can not delete this comment!");
         return res.redirect("back");
      }
   } catch (error) {
      req.flash("error", error);
      return res.redirect("back");
   }
};
