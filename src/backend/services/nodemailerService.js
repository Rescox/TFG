const nodemailer = require("nodemailer");
const config = require("../config/nodemailerConfig");

const user = config.user;
const pass = config.pass;

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});

module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
    transport.sendMail({
      from: user,
      to: email,
      subject: "PhishingSimulator Confirm Mail",
      html: `<h1>Email Confirmation</h1>
          <h2>Hello ${name}</h2>
          <p>Please confirm your email by clicking on the following link</p>
          <a href=http://localhost:3000/verification/${confirmationCode}> Click here</a>
          </div>`,
    }).catch(err => console.log(err));
  };