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

//Multiple Mailing

module.exports = router;