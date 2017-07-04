// server/app.js
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'user', 'password', {dialect: 'postgres', logging: false});
const model = require('./db/model/index.js').init(sequelize);
const user = require('./controllers/users');
const index = require('./controllers/index');
const app = express();


// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
//json parser
app.use(bodyParser.json());
// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')))

app.use('/', index);
app.use('/user', user);
app.use('/catalog', catalog);


app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;
