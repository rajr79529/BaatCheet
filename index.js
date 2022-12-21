const express = require("express");
const path = require("path");
const ejsLayout = require("express-ejs-layouts");
const database = require("./configs/mongoose");
const cookieParser = require("cookie-parser");
//setting up authentication using passport and express-session
const passport = require("passport");
const passportLocal = require("./configs/passport-local-strategy");
const session = require("express-session");
const MongoStore = require("connect-mongo");
// const sassMiddleware = require("node-sass-middleware");
const flash = require("connect-flash");
const customMware = require("./configs/middleware");

const port = 8000;
const app = express();

app.use(cookieParser());
app.use(express.urlencoded());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname + "/views"));

//
app.use(
   session({
      name: "baatcheet",
      //TODO change secret before deployment before production
      secret: "Quick brown fox",
      //this means whether we want to save extra data in session-cookie if the user is not initialised(authenticated)
      saveUninitialized: false,
      //do i want to save session-cookie data again and again even if i didn't change it.
      resave: false,
      cookie: {
         maxAge: 1000 * 60 * 120,
         // secure: true,
      },
      //this stores the session in db so that it can be persistent
      store: MongoStore.create({
         client: database.getClient(),
         autoRemove: "disabled",
      }),
   })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(customMware.setFlash);
//this will set the user locally each time req comes
app.use(passport.setAuthenticatedUser);

app.use(express.static("./assets"));
app.use(ejsLayout);
//to extract styles and scripts from files
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);

app.use("/", require("./routes"));
//this is connecting uploads to browser
app.use("/uploads", express.static(__dirname + "/uploads"));
app.listen(port, function (err) {
   if (err) {
      console.log(`Error in starting the server : ${err}`);
      return;
   }
   console.log(`Server running on Port : ${port}`);
});
