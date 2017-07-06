// server/app.js
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'user', 'password', {dialect: 'postgres', logging: false});
const model = require('./db/models/index.js');
const user = require('./routes/users');
const index = require('./routes/index');
const app = express();
var passport = require('passport');

require('./config/passport')(passport); // pass passport for configuration
// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '..', 'build')))
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions




app.use('/', index);
app.use('/user', user);


app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;
