const mailTransporter = require("../configs/nodemailer");

exports.newComment = (comment) => {
   // console.log("Comment ", comment);
   const dateString = new Date().toDateString();
   const htmlString = mailTransporter.renderTemplate(
      { comment, dateString },
      "/comments/new_comment.ejs"
   );
   mailTransporter.transporter.sendMail(
      {
         from: "1703113.ece.cec@cgc.edu.in",
         to: comment.user.email,
         subject: "New comment Published", // Subject line
         text: "Hello world?", // plain text body
         html: htmlString, // html body
      },
      (err, info) => {
         if (err) {
            console.log("Error in sending mail", err);
            return;
         }
         console.log(info);
      }
   );
};
