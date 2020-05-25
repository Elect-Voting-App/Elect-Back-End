//Getting database connection
const sql = require('./db');

//Constructor for admin 
const Admin = function (administrator) {
  this.firstname = administrator.firstname;
  this.lastname = administrator.lastname;
  this.email = administrator.email;
  this.password = administrator.password;
  this.role = administrator.role;
  this.date_registered = administrator.date_registered;
};

//Creating Admin register model
Admin.register = (newAdmin, result) => {
  sql.query("INSERT INTO admin SET ?", newAdmin, (err, res) => {
    if (err) {
      console.log('Error: ' + err);
      result(err, null);
      return;
    }

    //On success 
    console.log('Admin Added Successfully');
    result(null, { id: res.insertId, ...newAdmin });
  });
};

//Finding Admin using email
Admin.findByEmail = (adminEmail, result) => {
  sql.query(`SELECT id, firstname, lastname, email, role, date_registered  FROM admin WHERE email = '${adminEmail}'`, (err, res) => {
    //Error 
    if (err) {
      console.log('Error: ' + err);
      result(err, null);
      return;
    }

    //Email match found
    if (res.length) {
      result(null, res[0]);
      return;
    }

    //No match Found
    result({ kind: "No match found"}, null);
  });
};

//Getting the admin password for validation
Admin.getPass = (adminEmail, result) => {
  sql.query(`SELECT password FROM admin WHERE email = '${adminEmail}'`, (err, res) => {
    //Error 
    if (err) {
      console.log('Error: ' + err);
      result(err, null);
      return;
    }

    //Email match found
    if (res.length) {
      result(null, res[0]);
      return;
    }

    //No match Found
    result({ kind: "No match found"}, null);
  });
};

module.exports = Admin;