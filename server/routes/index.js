var express = require('express');
var router = express.Router();
var index_controller = require('../controllers/index/controller');

/* GET request for list of all Book items. */
router.get('/', index_controller.home);
router.post('/login',index_controller.login);

module.exports = router