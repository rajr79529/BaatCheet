module.exports.home = function (req, res) {
   return res.render("home", { title: "Home" });
   // res.send("<h1>The BaatCheet is up and running!!!!!!!!!!!!</h1>");
};
