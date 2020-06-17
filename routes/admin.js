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
      return res.json({
        status: false,
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
              res.json({ status: true, jwt: token, name: admin.name, email: admin.email, role: admin.role, refreshToken: refreshToken });
            }
          });
          console.log("Logging in");
        }
      });
    } else {
      return res.json({
        status: false,
        message: "Invalid Credentials."
      });
    }
  })
});

//Admin register route
router.post('/register', passportAuth, async (req, res) => {

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
      return res.status(500).json({
        status: false,
        message: err.message
      });
    }

    if (data) {
      return res.json({
        status: false,
        message: 'Admin Already Exists.'
      });
    }
    else {
      //Save admin in database
      Admin.register(admin, (err, data) => {
        if (err) {
          return res.status(500).json({
            status: false,
            message: err.message || "Some error occurred while creating the Administrator."
          });
        }
        if (data) {
          console.log(data);
          return res.json({
            status: true,
            message: 'Admin Successfully Created.'
          });
        }
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
      return res.status(500).json({
        message: err.message
      });
    }

    else return res.sendStatus(204);
  });
});

//Admin refresh route
router.post('/refresh', (req, res) => {
  const refreshToken = req.body.refreshToken;
  //Checking if refresh token Exists in the database
  Admin.checkRefreshToken(refreshToken, (err, data) => {
    if (err) {
      return res.status(500).json({
        message: err.message
      });
    }

    //Token Match Found
    if (data) {
      //Using reponse to get Admin model for JWT signing
      Admin.findByEmail(data.email, (err, data) => {
        if (err) {
          return res.status(500).json({
            status: false,
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

          return res.json({ jwt: token });

        }
      });
    } else {
      return res.sendStatus(401);
    }
  });
});

//Admin Delete route
router.delete('/remove/:id', passportAuth, async (req, res) => {
  const id = req.params.id;
  Admin.deleteAdmin(id, (err, data) => {
    //Error
    if (err) {
      return res.json({
        status: false,
        message: err.message
      });
    }

    if (data) {
      return res.json({
        status: true,
        message: 'Admin Deleted Successfully'
      });
    } else {
      return res.json({
        status: false,
        message: 'No Match Found for Admin'
      });
    }
  });
});

//All Admins route
router.get('/all-admins', (req, res) => {
  //Getting Admins
  Admin.getAll((err, data) => {
    //Error
    if (err) {
      return res.json({
        status: false,
        message: err.message
      });
    }

    //Getting data
    if (data) {
      return res.send({
        status: true,
        data
      });
    } else {
      return res.json({
        status: false,
        message: 'No Administrators found'
      });
    }
  });
});


module.exports = router;