'use strict';

const t = require('tcomb');
const roles = require('../../src/config/role');
const type = require('../../src/config/type');
const langs = require('../../src/config/lang');

// a subtype is a pair (type, predicate)
// where predicate is a function with signature (x) -> boolean
const Password = t.subtype(t.Str, s => s.length >= 6);

const Opcode = t.subtype(t.Str, s => {
    const pattern = /^[a-z0-9]+$/;
    return (s.length < 13) && pattern.test(s);
});


const Role = t.subtype(t.Str, s => Object.prototype.hasOwnProperty.call(roles, s.trim().toLowerCase()));
const Lang = t.subtype(t.Str, s => Object.prototype.hasOwnProperty.call(langs, s.trim().toLowerCase()));
const Type = t.subtype(t.Str, s => Object.prototype.hasOwnProperty.call(type, s.trim().toLowerCase()));


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
    lang: Lang,
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
    lang: t.maybe(Lang),
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

