const router = require('express').Router();
const { encryption, validation, syncEncryption } = require('../misc/encryption');
const date = require('../misc/date');
const Admin = require('../models/admin');
const { jwtSiging, passportAuth } = require('../misc/passport');
const randtoken = require('rand-token');
const upload = require('../misc/multer');
const csvOutput = require('../misc/csv-handler');
const Voter = require('../models/voter');
const Candidate = require('../models/candidate');



//Admin login route
router.post('/login', async (req, res) => {
  //Getting values from request
  const { email, password } = req.body;
  console.log(email);

  //Checking for email exists in db 
  Admin.getPass(email, async (err, data) => {
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

    //Validate password
    const ans = await validation(password, data.password);
    if (ans) {
      //Login Admin
      Admin.findByEmail(email, (err, data) => {
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
            role: data.role,
            initialLogin: data.change_password
          };

          console.log('Got to signing')
          //Getting token
          const token = jwtSiging(admin);
          const refreshToken = randtoken.uid(256);

          //Call Save token
          Admin.saveRefreshToken(admin.email, refreshToken, (err, data) => {
            if (err) {
              return res.status(500).json({
                status: false,
                message: err.message
              });
            }

            if (data) {
              console.log("Logging in");
              return res.json({ status: true, jwt: token, name: admin.name, email: admin.email, role: admin.role, initialLogin: admin.initialLogin, refreshToken: refreshToken });
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
        status: false,
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
router.get('/all-admins', passportAuth, async (req, res) => {
  //Getting Admins
  Admin.getAll((err, data) => {
    //Error
    if (err) {
      return res.status(500).json({
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

//Searching for Admin
router.post('/search', passportAuth, async (req, res) => {
  const email = req.body.email;

  Admin.searchAdmin(email, (err, data) => {
    //Error
    if (err) {
      return res.status(500).json({
        status: false,
        message: err.message
      });
    }

    if (data) {
      console.log(data);
      return res.json({
        status: true,
        data
      });
    } else {
      return res.json({
        status: false,
        message: 'No Match Found'
      });
    }
  });
});

router.put('/update-pass', passportAuth, async (req, res) => {
  const { email, password } = req.body;
  console.log(email + " " + password + " ");

  //Encrypting password
  const hashedPassword = await encryption(password);
  //Updating the actual password
  Admin.updatePassword(email, hashedPassword, (err, data) => {
    //Error
    if (err) {
      return res.status(500).json({
        status: false,
        message: err.message
      });
    }

    if (data) {
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


/*==== VOTER ROUTER ====*/
router.post('/register-voter', passportAuth, async (req, res) => {
  const row = req.body;

  //Encrypting password
  const hashedPassword = await encryption(row.Password);

  let voter = new Voter({
    firstname: row.Firstname,
    lastname: row.Lastname,
    email: row.Email,
    studentID: row.StudentID,
    hallID: row.Hall,
    year: row.Year,
    password: hashedPassword,
    date_registered: date()
  });

  Voter.findByEmail(row.Email, (err, data) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: err.message
      });
    }

    if (data) {
      return res.json({
        status: false,
        message: `Voter with email ( ${row.Email} ) Already Exists.`
      });
    } else {
      //Inserting Data into Database
      Voter.register(voter, (err, data) => {
        //Error
        if (err) {
          return res.status(500).json({
            status: false,
            message: err.message
          });
        }
        if (data) {
          return res.json({
            status: true,
            message: 'Voter Registered Successfully'
          });
        }
      });
    }
  });
});

//All Voters route
router.get('/all-voters', passportAuth, (req, res) => {
  //Getting All Voters
  Voter.getAll((err, data) => {
    //Error
    if (err) {
      return res.status(500).json({
        status: false,
        message: err.message
      });
    }

    //Getting data
    if (data) {
      return res.json({
        status: true,
        data
      });
    } else {
      return res.json({
        status: false,
        message: 'No Voters found'
      });
    }
  });
});

router.post('/search-voter', passportAuth, async (req, res) => {
  const email = req.body.email;

  Voter.searchVoter(email, (err, data) => {
    //Error
    if (err) {
      return res.status(500).json({
        status: false,
        message: err.message
      });
    }

    if (data) {
      console.log(data);
      return res.json({
        status: true,
        data
      });
    } else {
      return res.json({
        status: false,
        message: 'No Match Found'
      });
    }
  });
});

router.put('/update-voter-pass', passportAuth, async (req, res) => {
  const { email, password } = req.body;
  console.log(email + " " + password + " ");

  //Encrypting password
  const hashedPassword = await encryption(password);
  //Updating the actual password
  Voter.updatePassword(email, hashedPassword, (err, data) => {
    //Error
    if (err) {
      return res.status(500).json({
        status: false,
        message: err.message
      });
    }

    if (data) {
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

/*==== Candidate Routes ====*/
router.get('/all-candidates', passportAuth, (req, res) => {
  Candidate.getAll((err, data) => {
    //Error
    if (err) {
      return res.status(500).json({
        status: false,
        message: err.message
      });
    }

    //Getting data
    if (data) {
      return res.json({
        status: true,
        data
      });
    } else {
      return res.json({
        status: false,
        message: 'No Candidates found'
      });
    }
  });
});

//Get positions
router.get('/positions', passportAuth, (req, res) => {
  Candidate.getPositions((err, data) => {
    //Error
    if (err) {
      return res.status(500).json({
        status: false,
        message: err.message
      });
    }

    //Getting data
    if (data) {
      return res.json({
        status: true,
        data
      });
    } else {
      return res.json({
        status: false,
        message: 'No Positions found'
      });
    }
  });
});

//Get categories
router.get('/categories', passportAuth, (req, res) => {
  Candidate.getCategories((err, data) => {
    //Error
    if (err) {
      return res.status(500).json({
        status: false,
        message: err.message
      });
    }

    //Getting Data
    if (data) {
      return res.json({
        status: true,
        data
      });
    } else {
      return res.json({
        status: false,
        message: 'No Categories found'
      });
    }
  });
});

//Register Candidate
router.post('/register-candidate', passportAuth, (req, res) => {
  const { firstname, lastname, category, position } = req.body;

  let candidate = new Candidate({
    firstname,
    lastname,
    category_id: category,
    position_id: position
  });

  //Search Candidate 
  Candidate.findCandidate(firstname, lastname, (err, data) => {
    //Error
    if (err) {
      return res.status(500).json({
        status: false,
        message: err.message
      });
    }

    //Check
    if (data) {
      return res.json({
        status: false,
        message: 'Candidate Already Exists.'
      });
    } else {
      //Register method
      Candidate.register(candidate, (err, data) => {
        //Error
        if (err) {
          return res.status(500).json({
            status: false,
            message: err.message
          });
        }

        if (data) {
          console.log(data);
          return res.json({
            status: true,
            message: 'Candidate Successfully Created.'
          });
        }
      });
    }
  });
});

//Search Candidate
router.post('/search-candidate', passportAuth, (req, res) => {
  const { firstname, lastname } = req.body;

  //Searching
  Candidate.findCandidate(firstname, lastname, (err, data) => {
    //Error
    if (err) {
      return res.status(500).json({
        status: false,
        message: err.message
      });
    }

    if (data) {
      console.log(data);
      return res.json({
        status: true,
        data
      });
    } else {
      return res.json({
        status: false,
        message: 'No Match Found'
      });
    }
  });
});

//Candidate Delete route
router.delete('/remove-candidate/:id', passportAuth, async (req, res) => {
  const id = req.params.id;
  Candidate.deleteCandidate(id, (err, data) => {
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

//Change Password
router.post('/password-change', (req, res) => {
  const { email, oldPassword, newPassword, confirmPassword } = req.body;

  console.log(req.body)
  Admin.getPass(email, async (err, data) => {
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
    const ans = await validation(oldPassword, data.password);

    if (ans) {
      //Check if confirmPassword
      if (newPassword === confirmPassword) {
        const hashedPassword = await encryption(confirmPassword)
        Admin.updatePassword(email, hashedPassword, (err, data) => {
          if (err) {
            return res.status(500).json({
              status: false,
              message: err.message
            });
          }

          if (data) {
            // Change initial Status
            Admin.changeInital(email, (err, data) => {
              if (err) {
                return res.status(500).json({
                  status: false,
                  message: err.message
                });
              }

              if (data) {
                return res.json({
                  status: true,
                  message: "Password Changed Successfully."
                });
              } else {
                return res.json({
                  status: false,
                  message: "Failed to change inital password"
                });
              }
            });
          } else {
            return res.json({
              status: false,
              message: "Failed to change password"
            });
          }
        });

      }
    } else {
      return res.json({
        status: false,
        message: "Invalid credential"
      });
    }
  });
});

router.post('/get-info', passportAuth, (req, res) => {
  Admin.getInfo((err, data) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: err.message
      });
    }

    if (data) {
      return res.json({
        status: true,
        data: data
      });
    } else {
      return res.json({
        status: false,
        message: 'No data retrieved.'
      });
    }
  })
});

router.post('/initial', passportAuth, (req, res) => {
  const {email} = req.body;
  console.log(email)
  Admin.getInitial(email,(err, data) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: err.message
      });
    }

    if (data) {
      return res.json({
        status: true,
        data: data
      });
    } else {
      return res.json({
        status: false,
        message: 'No data retrieved.'
      });
    }
  });
});

module.exports = router;