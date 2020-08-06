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
Candidate.findCandidate = (candidateFirstname, candidateLastname, result) => {
  sql.query(`SELECT firstname, lastname FROM candidate WHERE firstname = '${candidateFirstname}' AND lastname = '${candidateLastname}'`, (err, res) => {
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

//Get all categories
Candidate.getCategories = result => {
  sql.query('SELECT * FROM category', (err, res) => {
    //Mysql Error
    if (err) {
      console.log('Error: ' + err);
      return result(err, null)
    }

    //Getting Categories
    if (res.length > 0) {
      return result(null, res);
    } else {
      //No Categories found
      return result(null, null);
    }
  });
};

Candidate.register = (newCandidate, result) => {
  sql.query('INSERT INTO candidate SET ?', newCandidate, (err, res) => {
    if (err) {
      console.log('Error: ' + err);
      return result(err, null);
    }

    if (res.affectedRows == 1) {
      //On success 
      console.log('Candidate Added Successfully');
      return result(null, { id: res.insertId, ...newCandidate });
    } else {
      return result(null,null);
    }
  });
};


module.exports = Candidate;