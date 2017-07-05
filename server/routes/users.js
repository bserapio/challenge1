var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/users/controller');

/* GET request for list of all Book items. */
router.get('/', user_controller.user_list);
module.exports = router