const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
require("dotenv").config();

const transporter = nodemailer.createTransport({
   service: "gmail",
   host: "smtp.gmail.com",
   port: 587,
   secure: false, // for two step verification
   auth: {
      user: process.env.email_id, // generated gmail user
      pass: process.env.email_pasd, // generated gmail password
   },
});

const renderTemplate = (data, relativePath) => {
   let template;
   ejs.renderFile(
      path.join(__dirname, "../views/mailers", relativePath),
      data,
      function (err, temp) {
         if (err) {
            console.log("error in finding template");
            return;
         }
         template = temp;
      }
   );
   return template;
};

module.exports = {
   transporter,
   renderTemplate,
};
