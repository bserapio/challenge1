
var t = require('tcomb');
var roles = require('../config/role');
var type  = require('../config/type');

// a subtype is a pair (type, predicate)
// where predicate is a function with signature (x) -> boolean
var Password = t.subtype(t.Str, function (s) {
    return s.length >= 6;
});

var Opcode = t.subtype(t.Str, function (s) {
    var pattern =  /^[a-z0-9]+$/;
    return (s.length < 13) && pattern.test(s)

});

var Language =  t.subtype(t.Str, function (s) {
    return s.length === 2;
});


var Role = t.subtype(t.Str,function(s){

    return  roles.hasOwnProperty(s.trim().toLowerCase());
});


var Type = t.subtype(t.Str,function(s){

    return  type.hasOwnProperty(s.trim().toLowerCase());
});



// a struct is a type containing properties (i.e. a class)
var CreateInput = t.struct({
    username: t.Str,
    name: t.Str,
    password: Password,
    role:   Role
});


var CreateUpdateInput = t.struct({
    username: t.maybe(t.Str),
    name: t.maybe(t.Str),
    password: t.maybe(Password),
    role:   t.maybe(Role),
});


var CreateDbInput = t.struct({
    identifier:Opcode,
    lang : Language,
    name : t.Str,
    dbPass: t.maybe(Password),
    type:Type
})


module.exports = {
    Password:     Password,
    CreateInput:  CreateInput,
    CreateDbInput: CreateDbInput,
    CreateUpdateInput:CreateUpdateInput,
};

