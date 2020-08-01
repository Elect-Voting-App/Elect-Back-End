//Getting database connection
const sql = require('./db');

//Constructor for Voter
const Voter = function (voter) {
  this.firstname = voter.firstname;
  this.lastname = voter.lastname;
  this.email = voter.email;
  this.student_id = voter.studentID;
  this.hall_id = voter.hallID;
  this.year = voter.year;
  this.password = voter.password;
  this.date_registered = voter.date_registered;
}

//Creating Voter register model
Voter.register = (newVoter, result) => {
  sql.query("INSERT INTO voter SET ?", newVoter, (err, res) => {
    if (err) {
      console.log('Error: ' + err);
      return result(err, null);
    }

    if (res.affectedRows == 1) {
      //On success
      console.log('Voter Registed Successfully');
      return result(null, {id: res.insertId, ...newVoter });
    } else {
      return result(null, null);
    }
  });
};

//Finding Voter using email
Voter.findByEmail = (voter, result) => {
  sql.query(`SELECT id, firstname, lastname, email, date_registered  FROM voter WHERE email = '${voter}'`, (err, res) => {
    //Error 
    if (err) {
      console.log('Error: ' + err);
      result(err, null);
      return;
    }

    //Email match found
    if (res.length > 0) {
      return result(null, res[0]);
      
    } else {
      return result(null, null);
    }
  });
};

module.exports = Voter;