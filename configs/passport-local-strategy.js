const passport = require("passport");
const LocalStrategy = require("passport-local");
const UserDb = require("../models/user");

//authentication using passport
passport.use(
   new LocalStrategy(
      {
         // probably, we are telling passport to consider email as username
         usernameField: "email",
      },
      function (email, password, done) {
         UserDb.findOne({ email: email }, function (err, user) {
            if (err) {
               console.log("Error in finding user --> passport");
               return done(err);
            }
            if (!user || user.password != password) {
               console.log("username/password is incorrect --> passport");
               return done(null, false);
            }
            // user found and password matched
            return done(null, user);
         });
      }
   )
);

//serializing user to decide which key to be stored in cookie
passport.serializeUser(function (user, done) {
   done(null, user.id);
});

//deserializing userid to find user from db
passport.deserializeUser(function (id, done) {
   UserDb.findById(id, function (err, user) {
      if (err) {
         console.log("username/password is incorrect --> passport");
         return done(null, false);
      }
      return done(null, user);
   });
});

//to check if the user is authenticated or not /
//we are writing our own middleware here
passport.checkAuthentication = function (req, res, next) {
   // if user is signed-in then pass the req to controller's function
   if (req.isAuthenticated()) {
      return next();
   }
   return res.redirect("/users/sign-in");
};

passport.setAuthenticatedUser = function (req, res, next) {
   // req.user contains autheticated user we are setting user to local
   if (req.isAuthenticated()) {
      res.locals.user = req.user;
   }
   next();
};

passport.checkActiveSession = function (req, res, next) {
   if (req.isAuthenticated()) {
      return res.redirect("/users/profile");
   }
   next();
};
module.exports = passport;
