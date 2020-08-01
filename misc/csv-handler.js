const fs = require('fs');
const csv = require('fast-csv');
const { encryption } = require('./encryption');

let csvOutput = (filename, result) => { 
  let csvData = [];
  let counter = 0;
  csvStream = csv.parseFile(`uploads/tmp/${filename}`, { headers: true })
    .on("data", function (record) {
      csvStream.pause();

      if(counter < 100)
      {
        let firstname = record.Firstname;
        let lastname = record.Lastname;
        let email = record.Email;
        let studentID = record.StudentID;
        let hallID = record.Hall;
        let year = record.Year;
        let password = record.Password;
        
        data = { firstname, lastname, email, studentID, hallID, year, password };
        csvData.push(data);
        ++counter;
        }

      csvStream.resume();

    }).on("end", function () {
      // console.log(csvData);
      return result(null, csvData)
    }).on("error", function (err) {
      console.log(err);
      return result(err, null);
    });
};

module.exports = csvOutput;