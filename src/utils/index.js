

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
const langFilter = [];
const rolesFilter = [];

module.exports = {
    stringOrder,
    checkAuth,
    generateKey,
    typeFilter,
    langFilter,
    rolesFilter,
};
