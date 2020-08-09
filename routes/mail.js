const router = require('express').Router();
const Mailer = require('../models/mail');

//Admin Mailing route
router.post('/admin', (req, res) => {
  //Retrieving details from request
  let user = req.body;

  Mailer.adminMailer(user, info => {
    if (info.accepted != null) {
      return res.json({
        status: true,
        message: 'Admin Successfully Created.'
      });
    } else {
      return res.json({
        status: false,
        message: 'Error Creating Admin.'
      });
    }
  });

});

//Sending Email for password reset
router.post('/update-pass', (req, res) => {
  let user = req.body;

  Mailer.passwordUpdate(user, info => {
    if (info.accepted != null) {
      return res.json({
        status: true,
        message: 'Updated Successfully.'
      });
    } else {
      return res.json({
        status: false,
        message: 'Error occured updating password.'
      });
    }
  });
});

//Send Voter Registration Email
router.post('/voter', (req, res) => {
  let user = req.body;
  Mailer.voterMailer(user, info => {
    if (info.accepted != null) {
      return res.json({
        status: true,
        message: 'Voter Successfully Created.'
      });
    } else {
      return res.json({
        status: false,
        message: `Error Sending Voter (${user.Email}) email`
      });
    }
  });
});

module.exports = router;