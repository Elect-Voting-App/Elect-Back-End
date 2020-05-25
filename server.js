//Imports
const express = require('express');
const app = express();
const dotenv = require('dotenv');

//Import Routes
const adminAuth = require('./routes/admin');

//Initializing the dotenv
dotenv.config();

const PORT = process.env.PORT;

//Middleware 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Route Middleware
app.use('/api/admin', adminAuth);

app.listen(PORT, console.log(`Server started on port ${PORT}`));