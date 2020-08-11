const router = require('express').Router();
const { jwtSiging, passportAuth } = require('../misc/passport');
const Voter = require('../models/voter');
const { validation } = require('../misc/encryption');
const randtoken = require('rand-token');

//Voter Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  Voter.getPass(username, async (err, data) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: err.message
      });
    }

    if (!data) {
      return res.json({
        status: false,
        message: "Invalid Credentials."
      });
    }

    //Validate Password
    const ans = await validation(password, data.password);
    if (ans) {
      //Login Voter
      Voter.findByStudentID(username, (err, data) => {
        if (err) {
          return res.status(500).json({
            status: false,
            message: err.message
          });
        }

        if (data) {
          const voter = {
            name: data.firstname + ' ' + data.lastname,
            studentID: data.student_id,
            hall: data.hall_name,
            initialLogin: data.change_password
          }

          //Getting token
          const token = jwtSiging(voter);
          const refreshToken = randtoken.uid(256);

          Voter.saveRefreshToken(username, refreshToken, (err, data) => {
            if (err) {
              return res.status(500).json({
                status: false,
                message: err.message
              });
            }

            if (data) {
              return res.json({status: true, jwt: token, name: voter.name, studentID: voter.studentID, hall: voter.hall, initialLogin: voter.initialLogin, refreshToken: refreshToken });
            }
          });
        }
      });
    } else {
      return res.json({
        status: false,
        message: "Invalid Credentials."
      });
    }
  });
});

module.exports = router;