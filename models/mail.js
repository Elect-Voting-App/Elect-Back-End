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
    from: `"ELECT VOTING SYSTEM" ${process.env.NODEMAILER_EMAIL}`, //Senders address
    to: user.email,
    subject: 'ELECT Voting System: Admin Account',
    html: `Hello ${user.firstname} ${user.lastname},<br>
    An admin account has been created for you at ELECT Voting System and you have been issued with a new temporary password.<br>
    Your current login information is:<br>
    email: ${user.email}<br>
    password: ${user.password}<br><br>
    You will have to change your password when you log in for the first time.<br>
    To start using ELECT Voting System, login at https://localhost:4200/admin. In most mail programs, this should appear as a blue link which you can just click on. If that doesn't work, then copy and paste the address into your browser and press the enter key.<br>
    Once you log in, you will be taken to your dashboard.<br><br>
    ELECT Voting System Admin<br>
    ${process.env.NODEMAILER_EMAIL}`
  };

  //Send email with defined transport object
  let info = await transporter.sendMail(mailOptions);

  callback(info);
}

const passwordUpdate = async function passwordUpdate(user, callback) {
  //Setting Mail option 
  let mailOptions = {
    from: `"ELECT VOTING SYSTEM" ${process.env.NODEMAILER_EMAIL}`, //Senders address
    to: user.email,
    subject: 'ELECT Voting System: Account Password Reset',
    html: `Hello,<br>
    You requested a password reset at ELECT Voting System and you have been issued with a new temporary password.<br>
    Your current login information is:<br>
    email: ${user.email}<br>
    password: ${user.password}<br><br>
    You will have to change your password when you log in .<br><br>
    ELECT Voting System Admin<br>
    ${process.env.NODEMAILER_EMAIL}` 
  };

  //Send email with defined transport object
  let info = await transporter.sendMail(mailOptions);

  callback(info);
};

module.exports.adminMailer = adminMailer;
module.exports.passwordUpdate = passwordUpdate;
