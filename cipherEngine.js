const express = require('express');
const app = express();


/*
    Routes Sections
 */

const Caesar = require('./API/Caesar');
app.use('/caesar' , Caesar);

const Atbash = require('./API/Atbash');
app.use('/atbash' , Atbash);


module.exports = app;