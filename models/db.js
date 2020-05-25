const mysql = require('mysql');
const dotenv = require('dotenv');

//Initialize dotenv
dotenv.config();

//Create a connection to the Database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB
});

//Open the mysql connection
connection.connect(error => {
  if(error) throw error;
  console.log('Successfully connected to the Database.');
});

module.exports = connection;