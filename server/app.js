// server/app.js
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'user', 'password', {dialect: 'postgres', logging: false});
const model = require('./db/models/index.js');
const requestMiddleware =require('./middleware/request')(model);
const app = express();
require('./config/passport')(passport); // pass passport for configuration
// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '..', 'build')))
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(requestMiddleware);


const index = require('./routes/index')(passport,express);
const user = require('./routes/user')(passport,express);

const client = require('./routes/client')(passport,express);
app.use('/api/client',client);
app.use('/api/user',user);
app.use('/', index);




app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;
