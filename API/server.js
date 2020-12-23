const http = require('http');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const localtunnel = require('localtunnel');
const fs = require("fs");
const myPort = 3000;

(
    async () => {
        const tunnel = await localtunnel({port : myPort , subdomain : "restful-api-text-cipher"});
        console.log(tunnel.url);
    }
)();

const app = express();
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

const service = require('./cipherEngine');
app.use('/api' , service);
app.listen(myPort);