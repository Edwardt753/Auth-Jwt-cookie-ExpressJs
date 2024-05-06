const nodemailer = require("nodemailer");
require("dotenv").config;

async function smtpSendMail(email, token) {
  const transporter = nodemailer.createTransport({
    //   service: "gmail",
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.ADMIN_ADRESS,
      pass: process.env.ADMIN_PASSWORD,
    },
  });
  const PORT = process.env.PORT;
  try {
    await transporter.sendMail({
      from: {
        name: "Admin",
        address: process.env.ADMIN_ADRESS,
      }, // sender address
      to: [email], // list of receivers
      subject: "Test Nodemailer", // Subject line
      text: "Hello world?", // plain text body
      html: `<p>Please click <a href= "http://localhost:${PORT}/resetpassword?token=${token}" >here</a> to reset your password.</p>`,
    });
  } catch (error) {
    return resizeBy.status(500).json({ msg: "server error" });
  }

  return email;
}

module.exports = { smtpSendMail };
