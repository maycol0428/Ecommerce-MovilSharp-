const nodeMailer = require("nodemailer");
const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    service: process.env.SMPT_SERVICE,
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.SMPT_MAIL, // sender address
    to: options.email, // list of receivers
    subject: options.subject, // Subject line
    html: `
    <p>
    You requested a password reset <a href="${options.url}"><strong>Click here</strong></a></p>        
    <div>you not requested this email then, please ignore it</div>
        </div>`,
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) console.log(err);
  });
};

module.exports = sendEmail;
