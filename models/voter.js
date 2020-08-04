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
Voter.findByEmail = (voterEmail, result) => {
  sql.query(`SELECT id, firstname, lastname, email, date_registered FROM voter WHERE email = '${voterEmail}'`, (err, res) => {
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

Voter.searchVoter = (voterEmail, result) => {
  sql.query(`SELECT id, firstname, lastname, student_id, email, date_registered FROM voter WHERE email LIKE '%${voterEmail}%'`, (err, res) => {
    //Error 
    if (err) {
      console.log('Error: ' + err);
      return result(err, null);
    }

    //Email match found
    if (res.length > 0) {
      return result(null, res);
    } else {
      return result(null, null);
    }
  });
};

//Deleting voter from Database
Voter.deleteVoter = (id, result) => {
  sql.query(`DELETE FROM voter WHERE id = ${id}`, (err, res) => {
    //Error
    if (err) {
      console.log('Error ' + err);
      return result(err, null);
    }

    //No Match Found
    if (res.affectedRows == 0) {
      //No token found
      result(null, null);
      return;
    }

    //On Success
    console.log('Admin deleted Successfully');
    return result(null, res);
  });
};

//Get all voters
Voter.getAll = result => {
  sql.query('SELECT id, firstname, lastname, email, student_id, hall_id, date_registered from voter', (err, res) => {
    //Error
    if (err) {
      console.log('Error: '+ err);
      return result(err, null)
    }

    //Getting admin data
    if (res.length > 0) {
      return result(null, res);
    } else {
      //No admin data
      return result(null, null);
    }
  });
};

module.exports = Voter;