var multer = require('multer');
const currentDate = require('./date');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/tmp')
  },
  filename: function (req, file, cb) {
    cb(null, currentDate() + '-' + file.originalname)
  }
});

var upload = multer({storage: storage})

module.exports = upload;