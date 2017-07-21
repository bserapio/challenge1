const types = require('../config/type');
const langs = require('../config/lang');

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



module.exports = {
    stringOrder,
    typeFilter,
    langFilter,
};
