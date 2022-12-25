module.exports.index = function (req, res) {
   return res.status(200).json({
      message: "Response from v2 Api",
      posts: [],
   });
};
