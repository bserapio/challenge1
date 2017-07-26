'use strict';

const bcrypt = require('bcrypt-nodejs');
const randomstring = require('randomstring');

const randomPassword = (num = 20) => randomstring.generate(num);
const remove = (array, element) => array.filter(e => e !== element);
const generatePassword = pass => bcrypt.hashSync(pass, bcrypt.genSaltSync(10), null);
module.exports = {

    remove, generatePassword, randomPassword,
};
