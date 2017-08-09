

const sha1 = require('sha1');

const generateKey = opcode => {
    const pub = 'dsSUDfiwzrsfdgiASUFsdf';
    return sha1(pub + opcode);
};

const stringOrder = (a, b, key) => {
    {
        const nameA = a[key].toUpperCase();
        const nameB = b[key].toUpperCase();
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
const removeUndefined = value => {
    if (value) {
        return true;
    }
    return false;
};
const getToken = () => {
    let token = null;
    const authConfig = checkAuth();
    console.log(authConfig);
    if (authConfig) {
        token = authConfig.token;
    }
    return token;
};


module.exports = {
    stringOrder,
    checkAuth,
    getToken,
    generateKey,
    removeUndefined,
    typeFilter,
    langFilter,
    rolesFilter,
};
