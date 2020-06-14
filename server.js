//Imports
const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const { passportInit, passportSess } = require('./misc/passport');

//Import Routes
const adminAuth = require('./routes/admin');
const mailer = require('./routes/mail');

//Initializing the dotenv
dotenv.config();

const PORT = process.env.PORT;

//Middleware 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passportInit);
app.use(passportSess);
app.use(cors());

//Route Middleware
app.use('/api/admin', adminAuth);
app.use('/api/mailing', mailer)

app.listen(PORT, console.log(`Server started on port ${PORT}`));