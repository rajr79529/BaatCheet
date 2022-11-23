module.exports.profile = function (req, res) {
   return res.render("profile", { title: "profile" });
   //    res.send("<h1>Users Profile</h1>");
};

module.exports.posts = function (req, res) {
   res.send("<h1>THis is Posts section</h1>");
};
