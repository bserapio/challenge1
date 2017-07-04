var express = require('express');
var router = express.Router();
var index_controller = require('./controller');

/* GET request for list of all Book items. */
router.get('/', index_controller.home);