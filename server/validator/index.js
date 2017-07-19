const t = require('tcomb');
const roles = require('../config/role');
const type = require('../config/type');

// a subtype is a pair (type, predicate)
// where predicate is a function with signature (x) -> boolean
const Password = t.subtype(t.Str, s => s.length >= 6);

const Opcode = t.subtype(t.Str, s => {
    const pattern = /^[a-z0-9]+$/;
    return (s.length < 13) && pattern.test(s);
});

const Language = t.subtype(t.Str, s => s.length === 2);


const Role = t.subtype(t.Str, s => roles.hasOwnProperty(s.trim().toLowerCase()));


const Type = t.subtype(t.Str, s => type.hasOwnProperty(s.trim().toLowerCase()));


// a struct is a type containing properties (i.e. a class)
const CreateInput = t.struct({
    username: t.Str,
    name: t.Str,
    password: Password,
    role: Role,
});


const CreateUpdateInput = t.struct({
    username: t.maybe(t.Str),
    name: t.maybe(t.Str),
    password: t.maybe(Password),
    role:   t.maybe(Role),
});


const CreateDbInput = t.struct({
    identifier: Opcode,
    lang: Language,
    name: t.Str,
    dbPass: t.maybe(Password),
    type: Type,
});

const CreateUpdateMetaDbInput = t.struct({
    newInvoice: t.maybe(t.Bool),
    newChannel: t.maybe(t.Bool),
    cubilis: t.maybe(t.Bool),
    ikentoo: t.maybe(t.Bool),
    seekda: t.maybe(t.Bool),
    channelManager: t.maybe(t.Bool),
});

const CreateUpdateDbInput = t.struct({
    identifier: t.maybe(Opcode),
    lang: t.maybe(Language),
    name: t.maybe(t.Str),
    dbPass: t.maybe(Password),
    type: t.maybe(Type),
    ClientMetum: t.maybe(CreateUpdateMetaDbInput),
});


module.exports = {
    Password,
    CreateInput,
    CreateDbInput,
    CreateUpdateInput,
    CreateUpdateDbInput,
    CreateUpdateMetaDbInput,

};

