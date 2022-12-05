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
