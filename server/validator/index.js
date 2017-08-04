'use strict';

const t = require('tcomb');
const selector = require('../../config/selectors');


const Password = t.subtype(t.Str, s => s.length >= 6);

const Opcode = t.subtype(t.Str, s => {
    const pattern = /^[a-z0-9]+$/;
    return (s.length < 13) && pattern.test(s);
});


const Role = t.subtype(t.Str, s => selector.roles.indexOf(s.trim().toLowerCase()) > -1);
const Lang = t.subtype(t.Str, s => Object.prototype.hasOwnProperty.call(selector.languages, s.trim().toLowerCase()));
const Type = t.subtype(t.Str, s => selector.types.indexOf(s.trim().toLowerCase()) > -1);


const CreateInput = t.struct({
    username: t.Str,
    name: t.Str,
    password: Password,
    isActive: t.maybe(t.Bool),
    role: Role,
});


const CreateUpdateInput = t.struct({
    username: t.maybe(t.Str),
    name: t.maybe(t.Str),
    password: t.maybe(Password),
    role:   t.maybe(Role),
    isActive: t.maybe(t.Bool),
});


const CreateDbInput = t.struct({
    identifier: Opcode,
    lang: Lang,
    name: t.Str,
    dbPass: t.maybe(Password),
    type: Type,
});

const CreateUpdateMetaDbInput = t.struct({
    new_invoice: t.maybe(t.Bool),
    new_channel: t.maybe(t.Bool),
    cubilis: t.maybe(t.Bool),
    ikentoo: t.maybe(t.Bool),
    seekda: t.maybe(t.Bool),
    channel_manager: t.maybe(t.Bool),
});

const CreateUpdateDbInput = t.struct({
    identifier: t.maybe(Opcode),
    lang: t.maybe(Lang),
    name: t.maybe(t.Str),
    dbPass: t.maybe(Password),
    type: t.maybe(Type),
    client_metas: t.maybe(CreateUpdateMetaDbInput),
});


module.exports = {
    Password,
    CreateInput,
    CreateDbInput,
    CreateUpdateInput,
    CreateUpdateDbInput,
    CreateUpdateMetaDbInput,

};

