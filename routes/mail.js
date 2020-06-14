const router = require('express').Router();
const Mailer = require('../models/mail');

//Admin Mailing route
router.post('/admin', (req, res) => {
  //Retrieving details from request
  let user = req.body;

  Mailer.adminMailer(user, info => {
    res.json({
      message: info
    });
  });

});

//Multiple Mailing

module.exports = router;