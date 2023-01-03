const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
//this will help to extract jwt from header
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/user");

const opts = {
   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
   secretOrKey: "secret",
};

passport.use(
   // jwt_payload contains userinfo
   new JwtStrategy(opts, function (jwt_payload, done) {
      //using sub not _id
      User.findOne({ _id: jwt_payload._id }, function (err, user) {
         if (err) {
            return done(err, false);
         }
         if (user) {
            return done(null, user);
         } else {
            return done(null, false);
         }
      });
   })
);

module.exports = passport;
