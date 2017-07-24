const types = require('../config/type');
const langs = require('../config/lang');
const roles = require('../config/role');

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
        console.log(auth)
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
    typeFilter,
    langFilter,
    rolesFilter,
};