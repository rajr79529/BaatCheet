const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");
require("dotenv").config();

// tell passport to use new google strategy for signin/signup
passport.use(
   new googleStrategy(
      {
         clientID: process.env.clientID_googleAuth,
         clientSecret: process.env.clientSecret_googleAuth,
         callbackURL: "http://localhost:8000/users/auth/google/callback",
      },
      function (accessToken, refreshToken, profile, done) {
         //find a user
         User.findOne({ email: profile.emails[0].value }).exec(function (
            err,
            user
         ) {
            if (err) {
               console.log("error in google passport strategy", err);
            }
            if (user) {
               //if found than set it is req.user
               return done(null, user);
            } else {
               //if not found create user and set it in req.user
               User.create(
                  {
                     name: profile.displayName,
                     email: profile.emails[0].value,
                     password: crypto.randomBytes(20).toString("hex"),
                  },
                  function (err, user) {
                     if (err) {
                        console.log(
                           "error in creating google passport strategy",
                           err
                        );
                     }

                     return done(null, user);
                  }
               );
            }
         });
      }
   )
);

module.exports = passport;
