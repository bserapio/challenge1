
var t = require('tcomb');
var roles = require('../config/role');

// a subtype is a pair (type, predicate)
// where predicate is a function with signature (x) -> boolean
var Password = t.subtype(t.Str, function (s) {
    return s.length >= 6;
});

var Role = t.subtype(t.Str,function(s){
    console.log(roles);
    return  roles.hasOwnProperty(s.trim().toLowerCase());
});


// a struct is a type containing properties (i.e. a class)
var CreateInput = t.struct({
    username: t.Str,
    name: t.Str,
    password: Password,
    role:   Role
});


module.exports = {
    Password:     Password,
    CreateInput:  CreateInput
};
