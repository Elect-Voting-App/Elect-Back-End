const router = require('express').Router();
const { encryption, validation } = require('../misc/encryption');
const date = require('../misc/date');
const Admin = require('../models/admin');
const { jwtSiging, passportAuth } = require('../misc/passport');
const randtoken = require('rand-token');

//Admin login route
router.post('/login', async (req, res) => {
  //Getting values from request
  const { email, password } = req.body;

  //Checking for email exists in db 
  Admin.getPass(email, async (err, data) => {
    if (err) {
      res.status(500).json({
        message: err
      });
    }

    if (!data) {
      res.json({
        message: "Invalid Credentials."
      });
    }

    //Validate password
    const ans = await validation(password, data.password);
    if (ans) {
      //Login Admin
      Admin.findByEmail(email, (err, data) => {
        if (err) {
          res.status(500).json({
            message: err.message
          });
        }

        //Retrieving Admin data
        if (data) {
          const admin = {
            name: data.firstname + ' ' + data.lastname,
            email: data.email,
            role: data.role
          };

          //Getting token
          const token = jwtSiging(admin);
          const refreshToken = randtoken.uid(256);

          //Call Save token
          Admin.saveRefreshToken(admin.email, refreshToken, (err, data) => {
            if (err) {
              res.status(500).json({
                message: err.message
              });
            }

            if (data) {
              res.json({ jwt: token, name: admin.name, email: admin.email, role: admin.role, refreshToken: refreshToken });
            }
          });
          console.log("Logging in");
          console.log(refreshToken);

        }
      });
    }
  })
});

//Admin register route
router.post('/register', async (req, res) => {

  //Getting all values from request
  const { firstname, lastname, email, password, role } = req.body;
  const hashedPassword = await encryption(password);
  const today = date();

  //Create admin
  const admin = new Admin({
    firstname,
    lastname,
    email,
    "password": hashedPassword,
    role,
    "date_registered": today
  });

  //Checking if email already exists
  Admin.findByEmail(email, (err, data) => {
    if (err) {
      res.status(500).json({
        message: err.message
      });
    }

    if (data) {
      res.json({
        message: "Email Already Exists"
      });
    } else {
      //Save admin in database
      Admin.register(admin, (err, data) => {
        if (err) {
          res.status(500).json({
            message:
              err.message || "Some error occurred while creating the Administrator."
          });
        }
        else res.json(data);
      });
    }
  });

});

//Admin logout route
router.post('/logout', (req, res) => {
  const refreshToken = req.body.refreshToken;
  //Delete token from database
  Admin.deleteRefreshToken(refreshToken, (err, data) => {
    if (err) {
      res.status(500).json({
        message: err.message
      });
    }

    else res.sendStatus(204);
  });
});

module.exports = router;