// server/app.js

'use strict';

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const fs = require('fs');

const app = express();
// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});


app.use(morgan('combined', {stream: accessLogStream}));
require('../config/passport')(passport);

app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());


app.use(session({secret: 'secret', resave: false, saveUninitialized: true, httpOnly: false}));
app.use(passport.initialize());
app.use(passport.session());


const index = require('./routes/index')(passport, express);
const user = require('./routes/user')(passport, express);
const client = require('./routes/client')(passport, express);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use('/api/client', client);
app.use('/api/user', user);
app.use('/', index);


app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;
