//Getting database connection
const sql = require('./db');

//Constructor for Candidate
const Candidate = function (candidate) {
  this.firstname = candidate.firstname;
  this.lastname = candidate.lastname;
  this.category_id = candidate.category_id;
  this.position_id = candidate.position_id;
};

//Find Candidate using email
Candidate.findByEmail = (candidateEmail, result) => {
  sql.query(``, (err, res) => {
    // Mysql Error
    if (err) {
      console.log('Error: ' + err);
      return result(err, null);
    }

    //Email match found
    if (res.length > 0) {
      return result(null, res[0]);

    } else {
      return result(null, null);
    }
  });
};

//Get all Candidates
Candidate.getAll = result => {
  sql.query('SELECT firstname, lastname, category_name, position_name FROM candidate, category, position WHERE candidate.category_id = category.id AND candidate.position_id = position.id', (err, res) => {
    //Mysql Error
    if (err) {
      console.log('Error: ' + err);
      return result(err, null)
    }

    //Getting candidate data
    if (res.length > 0) {
      return result(null, res);
    } else {
      //No candidate data
      return result(null, null);
    }
  });
};

//Get all positions
Candidate.getPositions = result => {
  sql.query('SELECT * FROM position', (err, res) => {
    //Mysql Error
    if (err) {
      console.log('Error: ' + err);
      return result(err, null)
    }

    //Getting Positions
    if (res.length > 0) {
      return result(null, res);
    } else {
      //No positions found
      return result(null, null);
    }
  });
};


module.exports = Candidate;