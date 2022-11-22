const express = require("express");
const path = require("path");
const port = 8000;

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname + "/views"));
app.use("/", require("./routes"));

app.listen(port, function (err) {
   if (err) {
      console.log(`Error in starting the server : ${err}`);
      return;
   }
   console.log(`Server running on Port : ${port}`);
});
