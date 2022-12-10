const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = function (req, res) {
   Post.findById(req.body.post, (err, post) => {
      if (post) {
         Comment.create(
            {
               content: req.body.content,
               user: req.user._id,
               post: req.body.post,
            },
            (err, comment) => {
               if (err) {
                  console.log("Error in Posting Comment", err);
                  return;
               }
               //putting comment ref to post's comments
               post.comments.push(comment);
               //telling server to save
               post.save();
               res.redirect("back");
            }
         );
      }
   });
};

module.exports.destroy = (req, res) => {
   Comment.findById(req.params.id, (err, comment) => {
      if (comment.user == req.user.id) {
         let postId = comment.post;
         comment.remove();
         Post.findByIdAndUpdate(
            postId,
            {
               $pull: { comments: req.params.id },
            },
            (err) => {
               return res.redirect("back");
            }
         );
      } else {
         return res.redirect("back");
      }
   });
};
