//Imports
const bcrypt = require('bcrypt');
const saltRounds = 10;

const encryption = (data) => {
  return bcrypt.hash(data, saltRounds);
};

const validation = (pass1, pass2) => {
  return bcrypt.compare(pass1, pass2);
}

const syncEncryption = (data) => {
  return bcrypt.hashSync(data,saltRounds);
}

module.exports.encryption = encryption;
module.exports.validation = validation;
module.exports.syncEncryption = syncEncryption;