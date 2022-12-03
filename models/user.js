const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
   {
      email: {
         type: String,
         required: true,
      },
      password: {
         type: String,
         required: true,
      },
      name: {
         type: String,
         required: true,
      },
   },
   //    this is saying db to store created at and updated at time
   {
      timestamps: true,
   }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
