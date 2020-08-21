const router = require('express').Router();
const { jwtSiging, passportAuth } = require('../misc/passport');
const Voter = require('../models/voter');
const { validation, encryption } = require('../misc/encryption');
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
    console.log(data)

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
              return res.json({ status: true, jwt: token, name: voter.name, studentID: voter.studentID, hall: voter.hall, initialLogin: voter.initialLogin, refreshToken: refreshToken });
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

// Voter Logout Route
router.post('/logout', (req, res) => {
  const refreshToken = req.body.refreshToken;
  //Delete token from database
  Voter.deleteRefreshToken(refreshToken, (err, data) => {
    if (err) {
      return res.status(500).json({
        message: err.message
      });
    }

    else return res.sendStatus(204);
  });
});

// Voter Password Change 
router.post('/password-change', (req, res) => {
  const { studentID, oldPassword, newPassword, confirmPassword } = req.body;

  console.log(req.body)
  Voter.getPass(studentID, async (err, data) => {
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
        Voter.changePassword(studentID, hashedPassword, (err, data) => {
          if (err) {
            return res.status(500).json({
              status: false,
              message: err.message
            });
          }

          if (data) {
            // Change initial Status
            Voter.changeInital(studentID, (err, data) => {
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

router.post('/categories', (req, res) => {
  Voter.getCategory((err, data) => {
    if (err) {
      res.status(500).json({
        status: false,
        message: err.message
      });
    }

    if (data) {
      res.json({
        status: true,
        data
      });
    } else {
      res.json({
        status: false,
        message: 'No Category Found'
      })
    }
  });
});

router.post('/positions', (req, res) => {
  Voter.getPosition((err, data) => {
    if (err) {
      res.status(500).json({
        status: false,
        message: err.message
      });
    }

    if (data) {
      res.json({
        status: true,
        data
      });
    } else {
      res.json({
        status: false,
        message: 'No Position Found'
      })
    }
  });
});

router.post('/candidates', (req, res) => {
  // console.log(position_id,category_id)
  Voter.getCandidate((err, data) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: err.message
      });
    }

    if (data) {
      console.log(data)
      return res.json({
        status: true,
        data
      });
    } else {
      return res.json({
        status: false,
        message: 'No Position Found'
      })
    }
  });
});

router.post('/initial', (req, res) => {
  const studentID = req.body;
  Voter.getInitial(studentID, (err, data) => {
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

router.post('/vote', (req, res) => {
  const mydata = req.body.data;
  let counter = 1;
  for (let x of mydata) {
    Voter.castVote(x, (err, data) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: err.message
        });
      }
      if (data) {
        counter++;
        while (counter === mydata.length) {
          return res.json({
            status: true,
            message: 'Voted Successfully'
          });
        }
      }
    });
  }
});

router.post('/results', (req, res) => {
  can_res = []
  counter = 1;
  Voter.getCandidate((err, data) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: err.message
      });
    }

    if (data) {
      for (const x of data) {

        Voter.getResults(x.id, x.positionID, x.categoryID, (err, mydata) => {
          if (err) {
            return res.status(500).json({
              status: false,
              message: err.message
            });
          }

          if (mydata) {
            counter++;
            can_res.push(mydata)
            while (counter === data.length) {
              return res.json({
                status: true,
                data: can_res
              })
            }
          } else {
            return res.json({
              status: false,
              message: 'Result not Found'
            })
          }
        });
      }
    } else {
      return res.json({
        status: false,
        message: 'No Position Found'
      })
    }
  });
  // console.log(position_id,category_id)
});

module.exports = router;