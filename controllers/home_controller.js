const Post = require("../models/post");

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
      .exec((err, posts) => {
         if (err) {
            console.log("Error in finding posts", err);
            return;
         }
         return res.render("home", { title: "Home", posts });
      });
   // res.send("<h1>The BaatCheet is up and running!!!!!!!!!!!!</h1>");
};
