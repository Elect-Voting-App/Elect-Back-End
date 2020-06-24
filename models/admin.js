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
      return result(err, null);
    }

    if (res.affectedRows == 1) {
      //On success 
      console.log('Admin Added Successfully');
      return result(null, { id: res.insertId, ...newAdmin });
      
    } else {
      return result(null,null);
    }
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
    if (res.length > 0) {
      return result(null, res[0]);
      
    } else {
      return result(null, null);
    }
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
    if (res.length > 0) {
      return result(null, res[0]);
    }
    else {
      //No match Found
      return result(null, null);
    }
  });
};

//Getting all Administrators
Admin.getAll = result => {
  sql.query('SELECT id, firstname, lastname, email, role, date_registered from admin', (err, res) => {
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

//Search For admin
Admin.searchAdmin = (adminEmail, result) => {
  sql.query(`SELECT id, firstname, lastname, email, role, date_registered  FROM admin WHERE email = '${adminEmail}'`, (err, res) => {
    //Error 
    if (err) {
      console.log('Error: ' + err);
      result(err, null);
      return;
    }

    //Email match found
    if (res.length > 0) {
      return result(null, res);
      
    } else {
      return result(null, null);
    }
  });
};

//Deleting Administrators
Admin.deleteAdmin = (id, result) => {
  sql.query(`DELETE FROM admin WHERE id = ${id}`, (err, res) => {
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

//Checking if refreshToken is in the Database
Admin.checkRefreshToken = (refreshToken, result) => {
  sql.query(`SELECT email FROM token WHERE refresh_token = '${refreshToken}'`, (err, res) => {
    //Error
    if (err) {
      console.log('Error: ' + err);
      result(err, null);
      return;
    }

    //Token match found
    if (res.length > 0) {
      result(null, res[0]);
      return;
    } //No Match found
    else {
      console.log(res);
      result(null, null);
    }

  });
};

//Deleting refreshToken
Admin.deleteRefreshToken = (refreshToken, result) => {
  sql.query(`DELETE FROM token WHERE refresh_token = '${refreshToken}'`, (err, res) => {
    //Error
    if (err) {
      return result(err, null);
    }

    if (res.affectedRows == 0) {
      //No token found
      return result(null, null);
    }

    //On Success
    console.log('Token deleted Successfully');
    return result(null, res);
  });
};

//Updating Password
Admin.updatePassword = (adminEmail, adminPass, result) => {
  sql.query(`UPDATE admin SET password = '${adminPass}' WHERE email = '${adminEmail}'`, (err, res) => {
    //Error 
    if (err) {
      return result(err, null);
    }

    if (res.affectedRows == 0) {
      //No match found for the email
      return result(null, null);
    }

    //On Success
    console.log('Update Successful');
    return result(null, res);
  });
};

module.exports = Admin;