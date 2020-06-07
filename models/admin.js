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
    result({ kind: "No match found" }, null);
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
    result({ kind: "No match found" }, null);
  });
};

//Saving refreshToken into Database
Admin.saveRefreshToken = (adminEmail, refreshToken, result) => {
  sql.query("INSERT INTO token SET email = ?, refresh_token = ?", [adminEmail, refreshToken], (err, res) => {
    //Error 
    if (err) {
      console.log('Error: ' + err);
      result(err, null);
      return;
    }

    //On Success
    console.log('Token Saved Successfully')
    result(null, { id: res.insertId });
  });
};

//Deleting refreshToken from Database
Admin.deleteRefreshToken = (refreshToken, result) => {
  sql.query(`DELETE FROM token WHERE refresh_token = '${refreshToken}'`, (err, res) => {
    //Error
    if (err) {
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      //No token found
      result({ kind: "not_found" }, null);
      return;
    }

    //On Success
    console.log('Token deleted Successfully');
    result(null, res);
  });
};

module.exports = Admin;