const types = require('../config/type');
const langs = require('../config/lang');
const roles = require('../config/role');

const sha1 = require('sha1');

const generateKey = opcode => {
    const pub = 'dsSUDfiwzrsfdgiASUFsdf';
    return sha1(pub + opcode);
};

const stringOrder = (a, b) => {
    {
        const nameA = a.username.toUpperCase();
        const nameB = b.username.toUpperCase();
        if (nameA < nameB) {
            return -1;
        } else if (nameA > nameB) {
            return 1;
        }
        return 0;
    }
};

const checkAuth = () => {
    let auth = localStorage.getItem('user');
    if (auth) {
        auth = JSON.parse(auth);
        return auth;
    }
    return null;
};

const typeFilter = [];
Object.keys(types).forEach(element => {
    const x = {
        value: element,
        text: types[element],
    };
    typeFilter.push(x);
});
const langFilter = [];
Object.keys(langs).forEach(element => {
    const x = {
        value: element,
        text: langs[element],
    };
    langFilter.push(x);
});

const rolesFilter = [];
Object.keys(roles).forEach(element => {
    const x = {
        value: element,
        text: roles[element],
    };
    rolesFilter.push(x);
});

module.exports = {
    stringOrder,
    checkAuth,
    generateKey,
    typeFilter,
    langFilter,
    rolesFilter,
};
