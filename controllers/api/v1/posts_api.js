const Post = require("../../../models/post");
const Comment = require("../../../models/comment");

module.exports.index = async function (req, res) {
   const posts = await Post.find()
      .sort("-createdAt")
      .populate("user")
      .populate({
         path: "comments",
         populate: {
            path: "user",
         },
      });

   return res.status(200).json({
      message: "Response from v1 Api",
      posts: posts,
   });
};

module.exports.destroy = (req, res) => {
   //first we will check if there is post
   //_id gives id but .id gives id in String format

   Post.findOne({ _id: req.params.id }, (err, post) => {
      if (err) {
         return res.status(404).json({
            message: "Error in finding the Post",
         });
      }

      if (post.user == req.user.id) {
         post.remove();
         Comment.deleteMany({ post: req.params.id }, (err) => {
            if (req.xhr) {
               return res.status(200).json({
                  postId: post.id,
                  message: "Successfully Deleted",
               });
            }
            //  req.flash("success", "post deleted successfully!");
            return res.status(200).json({
               message:
                  "Post and associated Comments Deleted Successfully",
            });
         });
      } else {
         return res.status(403).json({
            message: "Your can not delete this post",
         });
      }
   });
};
