'use strict';

const bcrypt = require('bcrypt-nodejs');
const randomstring = require('randomstring');

const randomPassword = (num = 20) => randomstring.generate(num);
const remove = (array, element) => array.filter(e => e !== element);
const generatePassword = pass => bcrypt.hashSync(pass, bcrypt.genSaltSync(10), null);
const checkPassword = (pass,cryptedPass) => {
    let hash = cryptedPass;
    hash = hash.substring(4);
    hash = `$2a$${hash}`;
    return bcrypt.compareSync(pass, hash);

}



module.exports = {

    remove, generatePassword, randomPassword,checkPassword
};
