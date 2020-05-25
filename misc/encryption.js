//Imports
const bcrypt = require('bcrypt');

const encryption = (data) => {
  const saltRounds = 10;
  return bcrypt.hash(data, saltRounds);
};

const validation = (pass1, pass2) => {
  return bcrypt.compare(pass1, pass2);
}

module.exports.encryption = encryption;
module.exports.validation = validation;