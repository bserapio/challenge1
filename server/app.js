// server/app.js

'use strict';

const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const acl = require('./acl/acl_middleware');

const app = express();
app.use(cors());
app.options('*', cors());
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
const common = require('./routes/common')(passport, express);

app.all('/services/*', acl.aclMiddleware);
app.use('/services/client', client);
app.use('/services/user', user);
app.use('/common', common);
app.use('/', index);


app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;
