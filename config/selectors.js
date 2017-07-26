'use strict';

const languages = {
    'en': 'English',
    'de': 'Deutsch',
    'es': 'Español',
    'nl': 'Nederlands',
    'sv': 'Svenska',
    'pt': 'Portugues',
    'it': 'Italian',
    'ru': 'Rusian',
    'zh': 'Chinese',
    'sl': 'Slovenski',
    'no': 'Norsk',
    'nb': 'Norsk',
    'ka': 'Georgian',
    'ar': 'Argelian',
    'ja': 'Japanese',
    'el': 'Greece',
    'tr': 'Turkey',
};

const roles = [
    'guest',
    'user',
    'finance',
    'manager',
    'sales',
    'account-manager',
    'admin',
    'super',
];

const types = [

    'demo',
    'client',
    'dev',
    'edu',
    'closed',

];

module.exports = {
    languages, roles, types,
}
;