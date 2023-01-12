const queue = require("../configs/kue");

const commentMailer = require("../mailers/commentMailer");

queue.process("emails", function (job, done) {
   commentMailer.newComment(job.data);
   done();
});
