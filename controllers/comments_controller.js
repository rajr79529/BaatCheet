const Post = require("../models/post");
const Comment = require("../models/comment");
const commmentEmailWorker = require("../workers/comment_email_worker");
const queue = require("../configs/kue");

module.exports.create = async function (req, res) {
   try {
      const post = await Post.findById(req.body.post);
      if (post) {
         let comment = await Comment.create({
            content: req.body.content,
            user: req.user._id,
            post: req.body.post,
         });
         //putting comment ref to start of post's comments
         post.comments.unshift(comment);
         //telling server to save
         post.save();

         // this is for sending mail to commenter
         comment = await comment.populate("user", "name email");
         // commentMailer.newComment(comment);
         const job = queue.create("emails", comment).save((error) => {
            if (error) {
               console.log("error in creating a queue");
               return;
            }
            console.log("Job enqueued", job.id);
         });

         //for AJAX request
         if (req.xhr) {
            return res.status(200).json({
               comment: comment,
               message: "comment created",
            });
         }
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
         if (req.xhr) {
            return res.status(200).json({
               commentId: comment._id,
               message: "Comment Deleted",
            });
         }
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
