'use strict';

const groups = require('./acl');

const urlPath = {};


const usersPath = {
    '/services/user*': [
        {
            groups: [groups.adminGroup], // min group
            methods: ['*'],
        },
        {
            groups: [groups.managerGroup], // min group
            methods: ['GET'],
        },

    ],

};
const clientChannel = {
    '/services/client/:id(\\d+)/channel': [
        {
            groups: [groups.adminGroup],
            methods: ['*'],
        },
        {
            groups: [groups.managerGroup],
            methods: ['GET', 'POST'],
        },
    ],

};
const clientActions = {
    '/services/client/:id(\\d+)/*': [
        {
            groups: [groups.adminGroup], // min group
            methods: ['*'],
        },
        {
            groups: [groups.managerGroup], // min group
            methods: ['GET', 'POST', 'PUT'],
        },
    ],

};
const clientDetail = {
    '/services/client/:id(\\d+)': [
        {
            groups: [groups.adminGroup], // min group
            methods: ['*'],
        },
        {
            groups: [groups.managerGroup], // min group
            methods: ['GET', 'POST', 'PUT'],
        },

        {
            groups: [groups.userGroup], // min group
            methods: ['GET'],

        },
    ],

};


const clientList = {
    '/services/client': [
        {
            groups: [groups.adminGroup], // min group
            methods: ['*'],
        },
        {
            groups: [groups.managerGroup], // min group
            methods: ['GET', 'POST', 'PUT'],
        },

        {
            groups: [groups.userGroup], // min group
            methods: ['GET'],

        },
    ],

};

const clientelevate = {
    '/services/client/elevate': [
        {
            groups: [groups.adminGroup], // min group
            methods: ['*'],
        },
        {
            groups: [groups.managerGroup], // min group
            methods: ['GET', 'POST', 'PUT'],
        },

    ],

};


Object.assign(urlPath, usersPath, clientList, clientDetail, clientChannel, clientActions, clientelevate);

for (const url in urlPath) {
    urlPath[url].forEach(element => {
        if ((!Object.prototype.hasOwnProperty.call(element, 'groups')) ||
            (!Object.prototype.hasOwnProperty.call(element, 'methods'))) {
            throw new Error('Error creating acl');
        }
    });
}

module.exports = {
    urlPath,


};

