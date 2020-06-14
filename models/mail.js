const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

//Initialize dotenv
dotenv.config();

//Creating reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD
  }
});

//Creating Single mailing
const adminMailer = async function adminMail(user, callback) {
  //Setting Mail Options
  let mailOptions = {
    from: process.env.NODEMAILER_EMAIL, //Senders address
    to: user.email,
    subject: '',
    html: ''
  };

  //Send email with defined transport object
  let info = await transporter.sendMail(mailOptions);

  callback(info);
}

module.exports.adminMailer = adminMailer;
