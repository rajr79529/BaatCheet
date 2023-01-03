const jwt = require("jsonwebtoken");
const User = require("../../../models/user");

//signing in user through jwt token
module.exports.createSession = async function (req, res) {
   try {
      const user = await User.findOne({ email: req.body.email });

      if (!user || user.password != req.body.password) {
         return res.status(401).json({
            message: "Invalid username or password",
         });
      }
      return res.status(200).json({
         message:
            "Sign in successful, here is your token. Please keep it safe!",
         data: {
            //jwt.sign() will set headers with user, secretKey and other options
            token: jwt.sign(user.toJSON(), "secret", {
               expiresIn: 1000000,
            }),
         },
      });
   } catch (error) {
      return res.status(500).json({
         message: "Internal server error",
      });
   }
};
