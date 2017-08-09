// load all the things we need
const LocalStrategy = require('passport-local').Strategy;
const dbApiService  = require('../db/dbApiService');
const utils = require('../utils/index');
const env = process.env.NODE_ENV || 'development';
const parameters = require(`${__dirname}/../../config/parameters.json`)[env]; // eslint-disable-lin
const jwt = require('jsonwebtoken');

